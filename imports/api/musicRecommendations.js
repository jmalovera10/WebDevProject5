import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';


export const MusicRecommendations = new Mongo.Collection('music_recommendations');

if (Meteor.isServer) {

    // This code only runs on the server
    Meteor.publish('music_rec', function tasksPublication() {
        return MusicRecommendations.find({userId: this.userId});
    });
}
