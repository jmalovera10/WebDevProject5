
import {Meteor} from "meteor/meteor";
import React from "react";
import {render} from "react-dom";
import App from "../imports/ui/App.js";
import {Accounts} from 'meteor/accounts-base';

Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY",
});

Meteor.startup(()=>{
    //esto debe ir en el main.js del servidor no en el cliente
    render(<App/>, document.getElementById("render-target"));
    $('html').attr('lang', 'es');
});
