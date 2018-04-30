import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";

import "./App.css";
import BubbleChart from "./D3/BubbleChart";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "index",
            userLocation: "index"
        }
    }

    render(){
        return(
            <div>
                <BubbleChart/>
            </div>
        );
    }
}

export default withTracker(() => {
    /*Meteor.subscribe("appusers");
    Meteor.subscribe("sorteos");
    let all = TossUps.find().fetch();
    all.sort((a,b)=>b.createdAt-a.createdAt);
    let users = Users.find().fetch();
    return {
        currentUser: Meteor.user(),
        users: users,
        sorteos: all
    }*/
})(App);