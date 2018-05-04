import React, {Component} from 'react';
import PropTypes from "prop-types";

import "./Index.css";

export default class Index extends Component {
    render() {
        return (
            <div className="row justify-content-around main">
                <div className="col-md-6 main-visualization  center-items">
                    <img src="EmotionerLogo.PNG" alt="emotioner-logo" className="col-md-8 col-10 img-logo"/>
                </div>
                <div className="col-md-6 main-interactions center-items">
                    <h1 className="slogan">
                        Monitor your emotions and give them what they need
                    </h1>
                    <div className="col-md-12">
                        <h3 className="invitation">
                            Be part of Emotioner.
                        </h3>
                    </div>
                    <div className="col-md-12 sign-up-button-container">
                        <button className="btn sign-up-button col-md-12" onClick={this.props.goToSignUp}>
                            Sign Up
                        </button>
                    </div>
                    <div className="col-md-12 login-button-container">
                        <button className="btn login-button col-md-12" onClick={this.props.goToLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Index.propTypes = {
    goToSignUp: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
};