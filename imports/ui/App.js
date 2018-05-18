import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import Index from "./index/Index.js";
import NavbarUser from "./navbar/NavbarUser.js";
import AuthNavbar from "./navbar/AuthNavbar.js";
import UserIndex from "./index/UserIndex.js";
import AuthManager from "./authentication/AuthManager.js";
import "./App.css";
import Recommendations from "./recommendations/Recommendations";
import PersonalInfoDialog from "./dialogs/PersonalInfoDialog";
import RecommendationDialog from "./dialogs/RecommendationDialog";
import ModifyPersonalInfoDialog from "./dialogs/ModifyPersonalInfoDialog";
import {Tones} from "/imports/api/Tones.js";
import {MusicRecommendations} from "../api/musicRecommendations";
import {PersonalInfo} from "../api/PersonalInfo";
import {PlaylistLikes} from "../api/PlaylistsLikes";
import {Speech} from "../api/speech";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "index",
            userLocation: "index",
            personalInfo: false,
            openRecommendationsDialog: false
        };

        this.goToIndex = this.goToIndex.bind(this);
        this.goToIndexUser = this.goToIndexUser.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
        this.onChangeCallback = this.onChangeCallback.bind(this);
        this.cancel = this.cancel.bind(this);
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

    componentDidMount() {

    }

    cancel() {
        this.setState({personalInfo: false});
    }

    onChangeCallback() {
        this.setState({personalInfo: true});
    }

    render() {
        return (
            <div className="app-content">
                {
                    this.props.currentUser ?
                        <NavbarUser onLogoutCallback={this.handleLogoutSubmit} onChangeCallback={this.onChangeCallback}
                                    goToIndex={this.goToIndexUser}/>

                        : this.state.location !== "index" ? <AuthNavbar goToIndex={this.goToIndex}/> : null
                }
                {
                    this.props.currentUser ?
                        (this.state.userLocation === "index" ?
                            <div>
                                <UserIndex tones={this.props.tones}
                                           openRecommendationsDialog={this.openRecommendationsDialog.bind(this)}
                                           goToRecommendations={this.goToRecommendations.bind(this)}
                                           transcript={this.props.transcript}/>
                                <PersonalInfoDialog personalInfo={this.props.personalInfo}/>
                            </div>

                            : <Recommendations musicRec={this.props.musicRec} likes={this.props.likes}/>)
                        : (this.state.location === "index" ?
                        <Index goToLogin={this.goToLogin} goToSignUp={this.goToSignUp}/> :
                        <AuthManager isLogin={this.state.location === "Login"} typeAuth={this.state.location}/>)
                }
                <RecommendationDialog open={this.state.openRecommendationsDialog}
                                      username={this.props.currentUser ? this.props.currentUser.username : "null"}
                                      handleClose={this.handleRecommendationsDialogClose.bind(this)}
                                      goToRecommendations={this.goToRecommendations.bind(this)}/>
                <ModifyPersonalInfoDialog personalInfo={this.state.personalInfo} realInfo={this.props.personalInfo}
                                          cancel={this.cancel}/>

            </div>
        );
    }
}

export default withTracker(() => {
    if (Meteor.user()) {
        Meteor.subscribe('tones');
        Meteor.subscribe('music_rec');
        Meteor.subscribe("PersonalInfo");
        Meteor.subscribe("PlaylistLikes");
        Meteor.subscribe('speech');
        let tones = Tones.find().fetch();
        let personalInfo = PersonalInfo.find().fetch()[0];
        let musicRec = MusicRecommendations.find().fetch().pop();
        let speech = Speech.find().fetch()[0];
        let likes = PlaylistLikes.find().fetch();

        if (likes && likes.length > 0 && musicRec[0]) {
            likes.forEach((like) => {
                musicRec[0].playlists.items.forEach((m)=>{
                    if (like.uri === m.uri){
                        m.likes = like.likes;
                        console.log(m);
                    }

                });
            });
            musicRec[0].playlists.items.sort((a, b) => {
                return a.likes < b.likes ? -1 : a.likes > b.likes ? 1 : 0;
            });
        }


        return {
            currentUser: Meteor.user(),
            tones: tones,
            musicRec: musicRec ? musicRec.playlists : undefined,
            personalInfo: personalInfo,
            likes: likes,
            transcript: speech ? speech.transcript : null
        }
    }
    return {};
})(App);