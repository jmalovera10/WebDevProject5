import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Tones = new Mongo.Collection('Tones');


if (Meteor.isServer) {

    // This code only runs on the server

    Meteor.publish('tones', function tasksPublication() {

        return Tones.find({owners: this.userId});

    });

}

Meteor.methods({

    'tones.new'(text) {
        check(text,String);
        console.log(text);
        global.Buffer = global.Buffer|| require('buffer').Buffer;

        let ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
        console.log("si");
        console.log(process.env.IBM_USERNAME);
        console.log(process.env.IBM_PASSWORD);
        let toneAnalyzer = new ToneAnalyzerV3({
            username: process.env.IBM_USERNAME,
            password: process.env.IBM_PASSWORD,
            version: '2017-09-21',
            url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
        });
        console.log(toneAnalyzer);
        toneAnalyzer.tone(
            {
                tone_input: text,
                content_type: 'text/plain'
            },
            function(err, tone) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(JSON.stringify(tone, null, 2));
                    Tones.insert({
                        userId:this.userId,
                        created_at:new Date(),
                        tone:JSON.stringify(tone, null, 2)
                    });
                }
            }

        );

    return "sisben";

    },

});