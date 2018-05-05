import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import "./UserIndex.css";
import BubbleChart from "../D3/BubbleChart";
import RecordAction from 'material-ui/svg-icons/av/mic';
import {red700} from 'material-ui/styles/colors';
import Subheader from 'material-ui/Subheader';
import Slider from 'material-ui/Slider';
import Carousel from "../Carousel";
import {Meteor} from "meteor/meteor";


export default class UserIndex extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:""
        };
        this.onStop = this.onStop.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onStop(blob) {
        console.log(blob);
    }
    onSubmit(){
        Meteor.call("tones.new", this.state.text,Meteor.user()._id ,(err, val)=>{
            if (err) throw err;
        })

    }
    onChange(e){
        this.setState({text: e.target.value});
    }
    componentWillUpdate(){
        console.log(this.props.tones);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-7 col-12">
                        <MuiThemeProvider>
                            <Subheader>Historical results</Subheader>
                        </MuiThemeProvider>
                        <Carousel/>
                    </div>
                    <div className="col-sm-1 col-1">
                        <MuiThemeProvider>
                            <Slider style={{height: 600}} axis="y"/>
                        </MuiThemeProvider>
                    </div>
                    <div className="col-sm-4 col-6">
                        <MuiThemeProvider>
                            <TextField
                                onChange={this.onChange}
                                hintText="Cuéntanos sobre tu día en un párrafo corto."
                                multiLine={true}
                                rows={2}
                                rowsMax={8}
                            />
                        </MuiThemeProvider>
                        <div className="row">
                            <div className="col-6">
                                <MuiThemeProvider>
                                    <FlatButton
                                        onClick={this.onSubmit}
                                        primary={true}
                                        label="Enviar"
                                    />
                                </MuiThemeProvider>
                            </div>
                            <div className="col-6">
                                <MuiThemeProvider>
                                    <FlatButton
                                        icon={<RecordAction color={red700}/>}
                                    />
                                </MuiThemeProvider>

                            </div>
                        </div>
                        <br/>
                        <br/>
                        <MuiThemeProvider>
                            <Subheader>Today's results</Subheader>
                        </MuiThemeProvider>
                        <BubbleChart width={350} height={400}
                                     anger={1}
                                     fear={1}
                                     joy={1}
                                     sadness={1}
                                     analytical={1}
                                     confident={1}
                                     tentative={1}/>
                    </div>
                </div>
            </div>
        );
    }
}