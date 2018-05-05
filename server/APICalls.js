import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Tones} from "/imports/api/Tones.js"


Meteor.methods({

    'tones.new'(text, userId) {
        check(text,String);
        console.log(text);
        global.Buffer = global.Buffer|| require('buffer').Buffer;

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
            Meteor.bindEnvironment(function(err, tone) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(tone.document_tone.tones);
                    Meteor.call("tones.insert", {
                        userId:userId,
                        created_at:new Date(),
                        tone:tone.document_tone.tones
                    });
                    Tones.insert({
                        userId:userId,
                        created_at:new Date(),
                        tone:tone.document_tone.tones
                    });

                }
            }
            )

        );


    },

});