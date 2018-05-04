import React, {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import "./UserIndex.css";
import BubbleChart from "../D3/BubbleChart";
import RecordAction from 'material-ui/svg-icons/av/mic';
import {red700} from 'material-ui/styles/colors';

export default class UserIndex extends Component {
    constructor(props){
        super(props);
        this.onStop=this.onStop.bind(this);
    }
    onStop(blob){
        console.log(blob);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-8 col-12">
                        <BubbleChart width={750} height={600}/>
                    </div>
                    <div className="col-sm-4 col-6">
                        <MuiThemeProvider>
                            <TextField
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
                    </div>
                </div>
            </div>
        );
    }
}