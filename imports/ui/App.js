import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import Index from "./index/Index.js";
import NavbarUser from "./navbar/NavbarUser.js";
import AuthNavbar from "./navbar/AuthNavbar.js";
import UserIndex from "./index/UserIndex.js";
import AuthManager from "./authentication/AuthManager.js";
import RecommendationDialog from "./dialogs/RecommendationDialog.js";
import {Tones} from "/imports/api/Tones.js";
import {MusicRecommendations} from "../api/musicRecommendations";

import "./App.css";
import Recommendations from "./recommendations/Recommendations";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "index",
            userLocation: "index",
            openRecommendationsDialog: false
        };

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
        this.setState({userLocation: "index"});
    }

    goToSignUp() {
        this.setState({location: "SignUp"});
    }

    goToLogin() {
        this.setState({location: "Login"});
    }

    goToRecommendations() {
        this.setState({userLocation: "recommendations", openRecommendationsDialog: false});
    }

    handleLogoutSubmit() {
        Meteor.logout();
    }

    openRecommendationsDialog() {
        this.setState({openRecommendationsDialog: true});
    }

    handleRecommendationsDialogClose() {
        this.setState({openRecommendationsDialog: false});
    }

    render() {
        return (
            <div className="app-content">
                {
                    this.props.currentUser ?
                        <NavbarUser onLogoutCallback={this.handleLogoutSubmit} goToIndex={this.goToIndexUser}/>
                        : this.state.location !== "index" ? <AuthNavbar goToIndex={this.goToIndex}/> : null
                }
                {
                    this.props.currentUser ?
                        (this.state.userLocation === "index" ?
                            <UserIndex tones={this.props.tones}
                                       openRecommendationsDialog={this.openRecommendationsDialog.bind(this)}/>
                            : <Recommendations/>)
                        : (this.state.location === "index" ?
                        <Index goToLogin={this.goToLogin} goToSignUp={this.goToSignUp}/> :
                        <AuthManager isLogin={this.state.location === "Login"} typeAuth={this.state.location}/>)
                }
                <RecommendationDialog open={this.state.openRecommendationsDialog}
                                      username={this.props.currentUser ? this.props.currentUser.username : "null"}
                                      handleClose={this.handleRecommendationsDialogClose.bind(this)}
                                      goToRecommendations={this.goToRecommendations.bind(this)}/>
            </div>
        );
    }
}

export default withTracker(() => {
    if (Meteor.user()) {
        Meteor.subscribe('tones');
        Meteor.subscribe('music_rec');
        let tones = Tones.find().fetch();
        let musicRec = MusicRecommendations.find().fetch();

        console.log(tones);

        return {
            currentUser: Meteor.user(),
            tones: tones,
            musicRec: musicRec
        }
    }
    return {};
})(App);