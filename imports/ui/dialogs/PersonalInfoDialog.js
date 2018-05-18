import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {Meteor} from "meteor/meteor";
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// App component - represents the whole app

export default class PersonalInfoDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
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
    }

    render() {
        const muiTheme = getMuiTheme({

            palette: {
                primary1Color: "rgb(79, 111, 183)",
                textColor: "#525252",
            }
        });

        const actions = [
            <MuiThemeProvider muiTheme={muiTheme}><TextField
                hintText="Su nombre completo"
                onChange={this.handleNameChange}
            /></MuiThemeProvider>,
            <br/>,
            <MuiThemeProvider muiTheme={muiTheme}><TextField
                hintText="Nombre de una persona a la cual notificar en caso de urgencia"
                onChange={this.handleAidNameChange}
            /></MuiThemeProvider>,
            <br/>,
            <MuiThemeProvider muiTheme={muiTheme}><TextField
                hintText="Email de esa persona"
                onChange={this.handleAidEmailChange}
            /></MuiThemeProvider>, <br/>,
            <MuiThemeProvider muiTheme={muiTheme}><FlatButton
                label="Enviar"
                primary={true}
                keyboardFocused={true}
                onClick={this.sendPersonalInfo}
            /></MuiThemeProvider>

        ];

        return (
            <div>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Dialog title="Necesitamos algunos datos tuyos para poder funcionar."
                            open={!this.props.personalInfo}
                            actions={actions}
                            modal={false}>
                    </Dialog>
                </MuiThemeProvider>
            </div>

        );

    }

}