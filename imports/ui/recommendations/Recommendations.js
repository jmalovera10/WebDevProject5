import React, {Component} from 'react';
import SpotifyPlayer from 'react-spotify-player';

import "./Recommendations.css";

export default class Recommendations extends Component{
    render(){
        // size may also be a plain string using the presets 'large' or 'compact'
        const size = {
            width: '100%',
            height: 300,
        };
        const view = 'list'; // or 'coverart'
        const theme = 'black'; // or 'white'
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <SpotifyPlayer
                            uri="spotify:album:1TIUsv8qmYLpBEhvmBmyBk"
                            size={size}
                            view={view}
                            theme={theme}
                        />
                    </div>
                    <div className="col-md-6 col-12">

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