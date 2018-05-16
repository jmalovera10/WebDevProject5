import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Meteor} from "meteor/meteor";


// App component - represents the whole app

export default class ModifyPersonalInfoDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            aidName: "",
            aidEmail: ""
        };
        this.sendPersonalInfo = this.sendPersonalInfo.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAidNameChange = this.handleAidNameChange.bind(this);
        this.handleAidEmailChange = this.handleAidEmailChange.bind(this);
    }

    handleNameChange(e) {
        this.setState({name: e.target.value});
    }
    handleAidNameChange(e) {
        this.setState({aidName: e.target.value});
    }
    handleAidEmailChange(e) {
        this.setState({aidEmail: e.target.value});
    }
    sendPersonalInfo() {
        Meteor.call('PersonalInfo.insert', this.state.name, this.state.aidName, this.state.aidEmail,Meteor.user()._id, (err, res) => {
            if (err) throw err;

        });
        this.props.cancel();

    }

    render() {

        const actions = [

            <MuiThemeProvider><TextField
                hintText="Nombre de una persona a la cual notificar en caso de urgencia"
                onChange={this.handleAidNameChange}
            /></MuiThemeProvider>,
            <br/>,
            <MuiThemeProvider><TextField
                hintText="Email de esa persona"
                onChange={this.handleAidEmailChange}
            /></MuiThemeProvider>, <br/>,
            <MuiThemeProvider><FlatButton
                label="Enviar"
                primary={true}
                keyboardFocused={true}
                onClick={this.sendPersonalInfo}
            /></MuiThemeProvider>, <br/>,
            <MuiThemeProvider><FlatButton
                label="Cancelar"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.cancel}
            /></MuiThemeProvider>

        ];

        return (
            <div>
                <MuiThemeProvider>
                    <Dialog title="Necesitamos algunos datos tuyos para poder funcionar."
                            open={this.props.personalInfo}
                            actions={actions}
                            onRequestClose={this.props.cancel}
                            modal={false}>

                    </Dialog>
                </MuiThemeProvider>
            </div>

        );

    }

}