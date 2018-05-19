import React, {Component} from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import "./UserIndex.css";
import BubbleChart from "../D3/BubbleChart";
import CircularProgress from 'material-ui/CircularProgress';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui/Slider';
import Carousel from "./Carousel";
import {Meteor} from "meteor/meteor";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SpeechRecognizer from './SpeechRecognizer.js';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            loading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.analytical = 0;
        this.anger = 0;
        this.confident = 0;
        this.fear = 0;
        this.joy = 0;
        this.sadness = 0;
        this.tentative = 0;
        if (this.props.tones && this.props.tones.length > 0) {
            this.lastTones = this.props.tones[this.props.tones.length - 1].tone;
        }
        if (this.lastTones) {
            this.lastTones.forEach((t) => {
                switch (t.tone_id) {
                    case "anger":
                        this.anger = t.score;
                        break;
                    case "joy":
                        this.joy = t.score;
                        break;
                    case "confident":
                        this.confident = t.score;
                        break;
                    case "analytical":
                        this.analytical = t.score;
                        break;
                    case "tentative":
                        this.tentative = t.score;
                        break;
                    case "fear":
                        this.fear = t.score;
                        break;
                    default:
                        this.sadness = t.score;
                        break;

                }
            })
        }
    }

    onSubmit() {
        this.setState({loading: true},
            Meteor.call("tones.translate", this.state.text, Meteor.user()._id, (err, val) => {
                if (err) throw err;
                Meteor.call('speech.reset',Meteor.user()._id);
                this.props.openRecommendationsDialog();
            })
        );
    }

    onChange(e) {
        this.setState({text: e.target.value});
    }

    componentWillReceiveProps(nextProps) {
        if(this.props!==nextProps){
            if(nextProps.transcript) {
                this.setState((prevState) => {
                    return {text: prevState.text + nextProps.transcript}
                });
            }
            this.setState({loading: false});
        }

    }
    componentDidUpdate(){

    }

    render() {

        this.analytical = 0;
        this.anger = 0;
        this.confident = 0;
        this.fear = 0;
        this.joy = 0;
        this.sadness = 0;
        this.tentative = 0;
        if (this.props.tones && this.props.tones.length > 0) {
            this.lastTones = this.props.tones[this.props.tones.length - 1].tone;
        }
        if (this.lastTones) {
            this.lastTones.forEach((t) => {
                switch (t.tone_id) {
                    case "anger":
                        this.anger = t.score;
                        break;
                    case "joy":
                        this.joy = t.score;
                        break;
                    case "confident":
                        this.confident = t.score;
                        break;
                    case "analytical":
                        this.analytical = t.score;
                        break;
                    case "tentative":
                        this.tentative = t.score;
                        break;
                    case "fear":
                        this.fear = t.score;
                        break;
                    default:
                        this.sadness = t.score;
                        break;

                }
            })
        }
        const muiTheme = getMuiTheme({

            palette: {
                primary1Color: "rgb(79, 111, 183)",
                textColor: "#525252",
            }
        });

        return (
            <div>
                <div className="row">
                    <div className="col-sm-4 col-6">
                        <MuiThemeProvider muiTheme={muiTheme}>
                            <TextField
                                onChange={this.onChange}
                                hintText="Cuéntanos sobre tu día en un párrafo corto."
                                multiLine={true}
                                rows={2}
                                rowsMax={8}
                                value={this.state.text}
                            />
                        </MuiThemeProvider>
                        <div className="row">
                            <div className="col-6">
                                <MuiThemeProvider muiTheme={muiTheme}>
                                    <RaisedButton
                                        onClick={this.onSubmit}
                                        primary={true}
                                        label="Enviar"
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className="col-6">
                                <SpeechRecognizer/>
                            </div>
                        </div>
                        <br/>
                        <div className="row justify-content-around">
                            <div className="col-10">
                                <MuiThemeProvider muiTheme={muiTheme}>
                                    <RaisedButton
                                        label="Ver Recomendaciones"
                                        primary={true}
                                        onClick={this.props.goToRecommendations}
                                        aria-label="Ver recomendaciones"
                                    />
                                </MuiThemeProvider>
                            </div>
                        </div>
                        <MuiThemeProvider muiTheme={muiTheme}>
                            <Subheader>Últimos resultados</Subheader>
                        </MuiThemeProvider>
                        {this.state.loading ?
                            <div>
                                <MuiThemeProvider>
                                    <CircularProgress color={"#BBDBB8"} size={200} thickness={7}/>
                                    <CircularProgress color={"#BBDBB8"} size={200} thickness={7}/>
                                    <h1 className="auth-text">Analizando</h1>
                                </MuiThemeProvider>
                            </div>
                            : null

                        }
                        <BubbleChart width={350} height={400}
                                     anger={this.anger}
                                     fear={this.fear}
                                     joy={this.joy}
                                     sadness={this.sadness}
                                     analytical={this.analytical}
                                     confident={this.confident}
                                     tentative={this.tentative}/>
                    </div>
                    <div className="col-sm-1 col-1">
                        <MuiThemeProvider muiTheme={muiTheme}>
                            <Slider style={{height: 600}} axis="y"/>
                        </MuiThemeProvider>
                    </div>
                    <div className="col-sm-7 col-12">

                        <MuiThemeProvider  muiTheme={muiTheme}>
                            <Subheader>Resultados históricos</Subheader>
                        </MuiThemeProvider>
                        <Carousel tones={this.props.tones}/>
                    </div>

                </div>
            </div>
        );
    }
}