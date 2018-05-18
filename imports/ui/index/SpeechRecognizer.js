import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import {red700} from "material-ui/styles/colors";
import RecordAction from 'material-ui/svg-icons/av/mic';

class SpeechRecognizer extends Component {

    constructor(props) {
        super(props);
        this.recording = false;
    }

    startRecording() {
        this.props.startListening();
        this.recording = true;
    }

    stopRecording() {
        this.props.stopListening();
        this.recording = false;
        Meteor.call('speech.insert', Meteor.user()._id, this.props.transcript);
        this.props.transcript = "";
    }

    render() {

        if (!this.props.browserSupportsSpeechRecognition) {
            return null
        }

        this.props.recognition.lang = 'es';

        return (
            <div>
                <MuiThemeProvider>
                    {
                        this.recording ?
                            <FlatButton
                                onClick={this.stopRecording.bind(this)}
                                icon={<RecordAction color={red700}/>}
                            />
                            : <FlatButton
                                onClick={this.startRecording.bind(this)}
                                icon={<RecordAction color={red700}/>}
                            />
                    }
                </MuiThemeProvider>
            </div>
        )
    }
}

SpeechRecognizer.propTypes = {
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    recognition: PropTypes.object,
};

const options = {
    autoStart: false
};

export default SpeechRecognition(options)(SpeechRecognizer)