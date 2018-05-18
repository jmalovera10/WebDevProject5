import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';


export const Speech = new Mongo.Collection('speech');

if (Meteor.isServer) {

    // This code only runs on the server
    Meteor.publish('speech', function tasksPublication() {
        return Speech.find({userId: this.userId});
    });
}

Meteor.methods({
    'speech.insert'(userId, transcript){
        check(userId, String);
        check(transcript, String);
        if(userId){
            let fetch = Speech.findOne({userId: userId});
            console.log(fetch);
            if (fetch) {
                Speech.update({userId: userId}, {$set: {transcript: transcript}});
            } else {
                Speech.insert({
                    userId: userId,
                    transcript: transcript
                });
            }
        }else{
            throw new Error("unauthorized");
        }
    },

    'speech.reset'(userId){
        check(userId, String);
        if(userId){
            let fetch = Speech.findOne({userId: userId});
            console.log(fetch);
            if (fetch) {
                Speech.update({userId: userId}, {$set: {transcript: ""}});
            } else {
                Speech.insert({
                    userId: userId,
                    transcript: ""
                });
            }
        }else{
            throw new Error("unauthorized");
        }
    }
});