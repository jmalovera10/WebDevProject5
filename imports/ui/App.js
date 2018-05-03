import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import Index from "./index/Index.js";
import NavbarUser from "./navbar/NavbarUser.js";
import UserIndex from "./index/UserIndex.js";
import AuthManager from "./authentication/AuthManager.js";

import "./App.css";
import BubbleChart from "./D3/BubbleChart";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "index",
            userLocation: "index"
        }

        this.goToIndex = this.goToIndex.bind(this);
        this.goToIndexUser = this.goToIndexUser.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    }

    goToIndex() {
        this.setState({location: "index"});
    }

    goToIndexUser() {
        Meteor.call('appusers.updateUserLocation', "index", "null");
        this.setState({userLocation: "index"});
    }

    goToSignUp() {
        this.setState({location: "SignUp"});
    }

    goToLogin() {
        this.setState({location: "Login"});
    }

    handleLogoutSubmit() {
        Meteor.logout();
    }
    componentDidMount(){
        Meteor.call("tones.new", "I'm sad", (err,res)=>{
            if (err) throw err;
            console.log(res);
        });
    }
    render() {
        return (
            <div className="app-content">
                {
                    this.props.currentUser ?
                        <NavbarUser onLogoutCallback={this.handleLogoutSubmit}/>
                        : null
                }
                {
                    this.props.currentUser ?
                        <UserIndex/>
                        : this.state.location === "index" ?
                        <Index goToLogin={this.goToLogin} goToSignUp={this.goToSignUp}/> :
                        <AuthManager isLogin={this.state.location === "Login"} typeAuth={this.state.location}/>
                }

            </div>
        );
    }
}

export default withTracker(() => {
    /*Meteor.subscribe("appusers");
    Meteor.subscribe("sorteos");
    let all = TossUps.find().fetch();
    all.sort((a,b)=>b.createdAt-a.createdAt);
    let users = Users.find().fetch();*/
    return {
        currentUser: Meteor.user(),
        /*users: users,
        sorteos: all*/
    }
})(App);