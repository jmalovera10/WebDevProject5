import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class RecommendationDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actions: [

                <FlatButton
                    label="Ir ahora"
                    primary={true}
                    keyboardFocused={true}
                    onClick={this.props.goToRecommendations}
                    aria-label="Boton para ir a recomendaciones"
                />,
                <FlatButton
                    label="Cancelar"
                    primary={true}
                    onClick={this.props.handleClose}
                    aria-label="Boton para volver a inicio"
                />
            ]
        }
    }

    render() {

        const customContentStyle = {
            width: '400px',
            maxWidth: 'none',

        };
        return (

            <MuiThemeProvider>
                <Dialog
                    actions={this.state.actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.props.handleClose}
                    contentStyle={customContentStyle}
                >
                    <h5>{this.props.username+" tenemos recomendaciones para tí"}</h5>
                </Dialog>
            </MuiThemeProvider>

        );
    }
}

RecommendationDialog.propTypes = {
    open:PropTypes.bool.isRequired,
    username:PropTypes.string.isRequired,
    handleClose:PropTypes.func.isRequired,
    goToRecommendations:PropTypes.func.isRequired,
}