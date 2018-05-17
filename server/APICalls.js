import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Tones} from "/imports/api/Tones.js";
import {PersonalInfo} from "/imports/api/PersonalInfo.js";
import {MusicRecommendations} from "../imports/api/musicRecommendations";
import { Email } from 'meteor/email'


Meteor.methods({

    'tones.new'(text, userId) {
        check(text, String);
        check(userId, String);
        global.Buffer = global.Buffer || require('buffer').Buffer;

        let ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

        let toneAnalyzer = new ToneAnalyzerV3({
            username: process.env.IBM_USERNAME,
            password: process.env.IBM_PASSWORD,
            version: '2017-09-21',
            url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
        });
        toneAnalyzer.tone(
            {
                tone_input: text,
                content_type: 'text/plain'
            },
            Meteor.bindEnvironment(function (err, tone) {
                if (err) {
                    console.log(err);
                } else {
                    Tones.insert({
                        userId: userId,
                        created_at: new Date(),
                        tone: tone.document_tone.tones
                    });
                    if(tone.document_tone.tones){
                        let sadness=false;
                        tone.document_tone.tones.forEach((t)=>{
                            if (t.tone_id==="sadness"){
                                sadness=true;
                            }

                        });
                        if(sadness){
                            console.log("the dude is sad");
                            let tonesUser=Tones.find({userId: userId}, {sort: {created_at:-1}}).fetch();
                            let count=0;
                            let total=0;
                            for (let tt of tonesUser){
                                let sadness=false;
                                tt.tone.forEach((t)=>{
                                    if (t.tone_id==="sadness"){
                                        sadness=true;
                                    }

                                });
                                if(sadness){
                                    count++;
                                }
                                total++;
                                if(total===10) break;
                            }
                            if (count>5){
                                Meteor.call('email.sendEmail',userId);
                            }
                        }

                    }


                    let tones = tone.document_tone.tones;

                    let maxCurrentMood = null;
                    if (tones && tones.length > 0) {
                        let maxVal = 0;
                        tones.forEach((t) => {
                            if (maxVal < t.score) {
                                maxVal = t.score;
                                maxCurrentMood = t.tone_name;
                            }
                        });
                        //console.log(maxCurrentMood);

                        if (maxCurrentMood) {
                            Meteor.call('music.getPlaylist', maxCurrentMood, userId);
                        }
                    }
                }
            })
        );

    },
    'tones.translate'(text, userId) {
        check(text, String);
        check(userId, String);
        const translate = require('google-translate-api');
        translate(text, {to: 'en'}).then(res => {
            console.log(res.text);
            Meteor.call('tones.new', res.text, userId, (err, val) => {
                if (err) console.log(err);
            });
        }).catch(err => {
            console.error(err);
        });
    },

    'music.getPlaylist'(emotion, userId) {
        if (!this.userId) throw new Error("Not authorized");
        check(emotion, String);
        check(userId, String);
        const Spotify = require('node-spotify-api');
        let spotify = new Spotify({
            id: process.env.SPFY_CLIENT,
            secret: process.env.SPFY_SECR
        });
        spotify.search({type: 'playlist', query: emotion})
            .then(Meteor.bindEnvironment((response) => {
                console.log(response);
                let fetch = MusicRecommendations.findOne({userId: userId});
                console.log(fetch);
                if(fetch) {
                    let playlists = fetch.playlists;
                    playlists.push(response);
                    MusicRecommendations.update({userId:userId}, {$set: {playlists:playlists}});
                }else{
                    MusicRecommendations.insert({
                        userId: userId,
                        playlists: [response]
                    });
                }
            }))
            .catch((err) => {
                console.log(err);
            });

    },
    'email.sendEmail'(userId){
        check(userId, String);
        let subject="Alerta Emotioner! Alguien que te importa te necesita.";
        let from='Emotioner <emotionerApp@gmail.com>';
        let info=PersonalInfo.find({userId:userId}).fetch()[0];
        let name=info.name;
        console.log(name);
        let aidName=info.aidName;
        let to=info.aidEmail;
        let text="Estimado "+aidName+", \n" +
        name+" te necesita. Lleva 5 días con tristeza registrada en los útlimos 10 días. Comunícate con él para saber como se encuentra.";
        this.unblock();
        Email.send({ to, from, subject, text });
    },
    'email.test'(){

        let subject="Emotioner alert! Someone you care about need you.";
        let from='Emotioner <emotionerApp@gmail.com>';
        let to="jma.lovera10@uniandes.edu.co";
        let text="Se jodió perrito";
        this.unblock();
        Email.send({ to, from, subject, text });
    },
    'PersonalInfo.insert'(name, aidName, aidEmail,userId) {
        check([name,aidName, aidEmail,userId], [String]);
        PersonalInfo.update({userId:userId},{
            userId:userId,
            name:name,
            aidEmail:aidEmail,
            aidName:aidName
        },{upsert:true})

    }

});