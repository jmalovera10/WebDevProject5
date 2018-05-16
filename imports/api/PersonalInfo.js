import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";

export const PersonalInfo = new Mongo.Collection('PersonalInfo');

if (Meteor.isServer) {

    // This code only runs on the server
    Meteor.publish('PersonalInfo', function tasksPublication() {
        return PersonalInfo.find({userId: this.userId});
    });


}