import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SpotifyPlayer from 'react-spotify-player';
import Snake from "react-snake-game";

import "./Recommendations.css";

export default class Recommendations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPlaylist: 0,
            previousDisabled: true,
            nextDisabled: false,
        }

    }

    goToNextPlaylist() {
        let musicRec = this.props.musicRec;
        if (musicRec && this.state.currentPlaylist + 1 < musicRec.length) {
            let curr = this.state.currentPlaylist;
            curr++;
            this.setState({currentPlaylist: curr, previousDisabled: false});
        } else {
            this.setState({nextDisabled: true});
        }
    }

    goToPreviousPlaylist() {
        let musicRec = this.props.musicRec;
        if (musicRec && this.state.currentPlaylist - 1 > 0) {
            let curr = this.state.currentPlaylist;
            curr--;
            this.setState({currentPlaylist: curr, nextDisabled: false});
        } else {
            this.setState({previousDisabled: true});
        }
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
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        let playlist = null;
        if (this.props.musicRec && this.props.musicRec.length > 0) {
            let pop = this.props.musicRec.pop();
            console.log(pop);
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
        );
    }
}

Recommendations.propTypes = {
    musicRec: PropTypes.array.isRequired
};