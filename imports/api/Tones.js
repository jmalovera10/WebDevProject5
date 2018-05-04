import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';


export const Tones = new Mongo.Collection('Tones');



if (Meteor.isServer) {

    // This code only runs on the server

    Meteor.publish('tones', function tasksPublication() {
        console.log(this.userId);
        return Tones.find({userId: this.userId});

    });
    

}