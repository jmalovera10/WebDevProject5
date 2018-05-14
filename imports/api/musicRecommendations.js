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

Meteor.methods({
    'music.getPlaylist'(emotion) {
        if(!this.userId)throw new Error("Not authorized");
        check(emotion, String);
        const SpotifyAPI = require('node-spotify-api');
        let webApi = new SpotifyAPI({
            id: process.env.SPFY_CLIENT,
            secret: process.env.SPFY_SECR
        });
        webApi.search({type: 'playlist', query: emotion})
            .then((response)=> {
                console.log(response);
            })
            .catch((err)=> {
                console.log(err);
            });
    }
});