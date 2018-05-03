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
        global.Buffer = global.Buffer|| require('buffer').Buffer;

        let ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

        let toneAnalyzer = new ToneAnalyzerV3({
            username: '9cf32683-7918-4fbf-98be-abc47b0fbebe',
            password: 'yxNXAor1HwBd',
            version: '2017-09-21',
            url: 'https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone'
        });

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
                }
            }
        );
    return "sisben";

    },

});