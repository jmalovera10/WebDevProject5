import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-player';
import Snake from "react-snake-game";
import Heart from 'material-ui/svg-icons/action/favorite-border';
import FilledHeart from 'material-ui/svg-icons/action/favorite';
import {red700} from 'material-ui/styles/colors';
import "./Recommendations.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from 'material-ui/IconButton';

export default class Recommendations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlaylist: 0,
            previousDisabled: true,
            nextDisabled: false,
        };
        this.likePlaylist = this.likePlaylist.bind(this);
    }

    goToNextPlaylist() {
        let musicRec = this.props.musicRec[0].playlists.items;
        if (musicRec && this.state.currentPlaylist + 1 < musicRec.length) {
            let curr = this.state.currentPlaylist;
            curr++;
            this.setState({currentPlaylist: curr, previousDisabled: false});

        } else {
            this.setState({nextDisabled: true});
        }
    }

    goToPreviousPlaylist() {
        let musicRec = this.props.musicRec[0].playlists.items;
        if (musicRec && this.state.currentPlaylist - 1 >= 0) {
            let curr = this.state.currentPlaylist;
            curr--;
            this.setState({currentPlaylist: curr, nextDisabled: false});
        } else {
            this.setState({previousDisabled: true});
        }
    }

    likePlaylist() {
        console.log("liking");
        Meteor.call("playlist.like", this.props.musicRec[0].playlists.items[this.state.currentPlaylist].uri, Meteor.user()._id)
    }

    componentDidMount() {
        console.log(this.props.likes);
    }

    render() {
        // size may also be a plain string using the presets 'large' or 'compact'
        const size = {
            width: '100%',
            height: 400,
        };
        const WRAPPER_STYLE = {
            margin: '30px auto',
            height: 500,
            width: 700
        };

        let playlistLikes = null;
        if (this.props.likes && this.props.likes.length > 0) {
            this.props.likes.forEach((like) => {
                if (like.uri === this.props.musicRec[0].playlists.items[this.state.currentPlaylist].uri) {
                    playlistLikes = like;
                }
            })
        }
        console.log(playlistLikes);
        const view = 'list'; // or 'coverart' list
        const theme = 'white'; // or 'white' black
        let playlist = null;
        if (this.props.musicRec && this.props.musicRec.length > 0) {
            let pop = this.props.musicRec[0];
            playlist = pop.playlists.items[this.state.currentPlaylist].uri;
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="row">
                            <SpotifyPlayer
                                uri={playlist}
                                size={size}
                                view={view}
                                theme={theme}
                            />
                        </div>
                        <div className="row">
                            <button disabled={this.state.previousDisabled}
                                    onClick={this.goToPreviousPlaylist.bind(this)}
                                    className="btn col-6 btn-playlist">Prev. Playlist
                            </button>
                            <button disabled={this.state.nextDisabled} onClick={this.goToNextPlaylist.bind(this)}
                                    className="btn col-6">Next Playlist
                            </button>
                        </div>
                        <div className="row">
                            <div className="col-6 sol-sm-3">
                                <MuiThemeProvider>
                                    <IconButton aria-label="Like" onClick={this.likePlaylist}>
                                        {(playlistLikes && playlistLikes.users[Meteor.user()._id]) ?

                                            <FilledHeart color={red700}/> :
                                            <Heart/>}
                                    </IconButton>
                                </MuiThemeProvider>
                                <div>
                                </div>
                                <div className="row">
                                    <div className="col-6 sol-sm-3">
                                        {playlistLikes ? playlistLikes.likes : 0} Me gusta
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12">
                                <div style={WRAPPER_STYLE}>
                                    <Snake/>
                                </div>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-12">

                            </div>
                            <div className="col-md-6 col-12">

                            </div>
                        </div>
                    </div>
                </div>
            </div>);
    }
}
Recommendations.propTypes = {
    musicRec: PropTypes.array.isRequired
};





