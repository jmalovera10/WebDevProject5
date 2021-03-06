import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Tones} from "/imports/api/Tones.js";
import {PersonalInfo} from "/imports/api/PersonalInfo.js";
import {MusicRecommendations} from "../imports/api/musicRecommendations";
import {Email} from 'meteor/email'
import {PlaylistLikes} from "../imports/api/PlaylistsLikes";

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
                    if (tone.document_tone.tones) {
                        let sadness = false;
                        tone.document_tone.tones.forEach((t) => {
                            if (t.tone_id === "sadness") {
                                sadness = true;
                            }

                        });
                        if (sadness) {
                            let tonesUser = Tones.find({userId: userId}, {sort: {created_at: -1}}).fetch();
                            let count = 0;
                            let total = 0;
                            for (let tt of tonesUser) {
                                let sadness = false;
                                tt.tone.forEach((t) => {
                                    if (t.tone_id === "sadness") {
                                        sadness = true;
                                    }

                                });
                                if (sadness) {
                                    count++;
                                }
                                total++;
                                if (total === 10) break;
                            }
                            if (count > 5) {
                                Meteor.call('email.sendEmail', userId);
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
                                maxCurrentMood = t.tone_id;
                            }
                        });

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
            console.log("failed to translate text");
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
        let searchParam = "";
        switch (emotion) {
            case "anger":
                searchParam = "relax";
                break;
            case "joy":
                searchParam = "happy hits";
                break;
            case "confident":
                searchParam = "tender";
                break;
            case "analytical":
                searchParam = "Mood Booster";
                break;
            case "tentative":
                searchParam = "confidence";
                break;
            case "fear":
                searchParam = "confidence";
                break;
            default: //aka sadness
                searchParam = "happy hits";
                break;

        }
        spotify.search({type: 'playlist', query: searchParam})
            .then(Meteor.bindEnvironment((response) => {
                let playlists={};
                playlists.playlists={};
                playlists.playlists.items=[];
                response.playlists.items.forEach((m)=>{
                    let p=PlaylistLikes.find({uri:m.uri}).fetch()[0];

                    let obj=m;
                    if(p) {
                        obj.likes = p.likes;
                    }
                    else{
                        obj.likes=0;
                    }
                    playlists.playlists.items.push(obj);
                });
                playlists.playlists.items.sort((a, b) => {
                    return b.likes - a.likes ;
                });
                MusicRecommendations.update({userId: userId}, {$set: {playlists: [playlists]}}, {upsert:true});

            }))
            .catch((err) => {
                console.log(err);
                console.log("Failed to fetch spotify list");
            });

    },
    'email.sendEmail'(userId) {
        check(userId, String);
        let subject = "Alerta Emotioner! Alguien que te importa te necesita.";
        let from = 'Emotioner <emotionerApp@gmail.com>';
        let info = PersonalInfo.find({userId: userId}).fetch()[0];
        let name = info.name;
        let aidName = info.aidName;
        let to = info.aidEmail;
        let text = "Estimado " + aidName + ", \n" +
            name + " te necesita. Lleva 5 días con tristeza registrada en los útlimos 10 días. Comunícate con él para saber como se encuentra.";
        this.unblock();
        Email.send({to, from, subject, text});
    },
    'email.test'() {

        let subject = "Emotioner alert! Someone you care about need you.";
        let from = 'Emotioner <emotionerApp@gmail.com>';
        let to = "jma.lovera10@uniandes.edu.co";
        let text = "Se jodió perrito";
        this.unblock();
        Email.send({to, from, subject, text});
    },
    'PersonalInfo.insert'(name, aidName, aidEmail, userId) {
        check([name, aidName, aidEmail, userId], [String]);
        PersonalInfo.update({userId: userId}, {
            userId: userId,
            name: name,
            aidEmail: aidEmail,
            aidName: aidName
        }, {upsert: true})

    },
    'playlist.like'(uri,userId){
        check(uri, String);
        check(userId, String);
        let review=PlaylistLikes.find({uri:uri}).fetch();
        let newReview={};
        if(review && review.length>0){
            newReview=review[0];
            let users=newReview.users;
            let likes=0;
            if(users[userId]) {
                users[userId]=0;
                likes=newReview.likes;
                likes--;
            }
            else {
                users[userId] = 1;
                likes = newReview.likes;
                likes++;
            }
            newReview.users=users;
            newReview.likes=likes;
        }
        else{
            let users={};
            users[userId] = 1;
            newReview={
                likes:1,
                uri:uri,
                users: users
            };

        }
        PlaylistLikes.update({uri:uri},newReview, {upsert:true});

    }

});