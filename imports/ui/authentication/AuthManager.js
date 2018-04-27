import React, {Component} from 'react';
import EmailPassword from "./EmailPassword.js";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from 'material-ui/CircularProgress';

import "./Auth.css";
import {Meteor} from "meteor/meteor";

export default class AuthManager extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            pswd: null,
            pswdVer: null,
            isLogin: this.props.authType === "login",
            disableButton: true,
            processingAuth: false,
            loginError: false,
            pswdMatch: false,
            emailError: false,
            usernameError: false,
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePswdChange = this.handlePswdChange.bind(this);
        this.verifyInput = this.verifyInput.bind(this);
        this.handlePswdVerChange = this.handlePswdVerChange.bind(this);
        this.loginWithPassword = this.loginWithPassword.bind(this);
        this.createUser = this.createUser.bind(this);
        
    }

    handleUsernameChange(val) {
        this.setState({username: val});
        this.verifyInput();
    }

    handleEmailChange(val) {
        this.setState({email: val});
        this.verifyInput();
    }

    handlePswdChange(val) {
        this.setState({pswd: val});
        this.verifyInput();
    }

    handlePswdVerChange(val) {
        this.setState({
            pswdVer: val,
            pswdMatch: this.state.pswd === val
        });
        this.verifyInput();
        this.setState({disableButton: ((this.state.pswd === this.state.pswdVer) && this.state.disableButton)});
    }

    verifyInput() {
        let emailRegex = /^\S+@\S+(\.\S+)+$/;
        this.setState({
            disableButton: !((this.state.email && this.state.email !== "") && (this.state.pswd && this.state.pswd !== "") ?
                emailRegex.test(this.state.email) : false)
        });
    }

    loginWithPassword(e) {
        e.preventDefault();
        this.setState({
            processingAuth: true,
            loginError: false,
        });
        Meteor.loginWithPassword(this.state.email, this.state.pswd, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
                this.setState({
                    processingAuth: false,
                    loginError: true,
                });
            } else {
                this.setState({loginError: false})
                Meteor.call('appusers.online');
            }
        });
    }

    createUser(e) {
        this.setState({
            processingAuth: true,
            emailError: false,
            usernameError: false,
        });
        e.preventDefault();
        Accounts.createUser({
            email: this.state.email,
            password: this.state.pswd,
            username: this.state.username
        }, (error) => {
            if (error) {
                console.log("Error: " + error.reason);
                this.setState({
                    processingAuth: false
                });
                if (error.reason.startsWith("Email")) {
                    this.setState({
                        emailError: true,
                    });
                } else if (error.reason.startsWith("Username")) {
                    this.setState({
                        usernameError: true,
                    });
                }
            } else {
                Meteor.call('appusers.insert', true);
            }
        });
    }

    render() {
        return (
            <div className="row justify-content-around">
                {
                    this.state.processingAuth ?
                        <div className="center-items">
                            <MuiThemeProvider>
                                <div className="circular-progress">
                                    <CircularProgress color={"#BBDBB8"} size={80} thickness={7}/>
                                    <h1 className="auth-text">Logging in</h1>
                                </div>
                            </MuiThemeProvider>
                        </div>
                        : < EmailPassword
                            submitAction={this.loginWithPassword}
                            isLogin={this.state.isLogin}
                            onUsernameChange={this.handleUsernameChange}
                            onEmailChange={this.handleEmailChange}
                            onPswdChange={this.handlePswdChange}
                            onPswdVerChange={this.handlePswdVerChange}
                            loginError={this.state.loginError}
                            disableButton={this.state.disableButton}
                            match={this.state.pswdMatch}
                            emailError={this.state.emailError}
                            usernameError={this.state.usernameError}
                        />
                }
            </div>
        );
    }

}