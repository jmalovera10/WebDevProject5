import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Tones} from "/imports/api/Tones.js";
import {MusicRecommendations} from "../imports/api/musicRecommendations";


Meteor.methods({

    'tones.new'(text, userId) {
        check(text, String);
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
                    let tones = tone.document_tone.tones;
                    console.log(tones);
                    let maxCurrentMood = null;
                    if (tones && tones.length > 0) {
                        let maxVal = 0;
                        tones.forEach((t) => {
                            if (maxVal < t.score) {
                                maxVal = t.score;
                                maxCurrentMood = t.tone_name;
                            }
                        });
                        console.log(maxCurrentMood);
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
    }

});