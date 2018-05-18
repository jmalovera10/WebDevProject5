import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

export const PlaylistLikes = new Mongo.Collection('PlaylistLikes');

if (Meteor.isServer) {

    // This code only runs on the server
    Meteor.publish('PlaylistLikes', function tasksPublication() {
        return PlaylistLikes.find();
    });


}