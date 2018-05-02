import React, {Component} from "react";
import PropTypes from "prop-types";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
import SignOut from "material-ui/svg-icons/action/power-settings-new"

import "./NavbarUser.css";

export default class NavbarUser extends Component {
    render() {
        return (
            <div className="navbar-user">
                <MuiThemeProvider>
                    <AppBar
                        title="Emotioner"
                        iconElementLeft={
                            <IconMenu
                                iconButtonElement={<IconButton aria-label="Button that expands the menu"
                                ><Menu color={"#1498D5"}/></IconButton>}
                                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}

                            >
                                <MenuItem primaryText="Sign out" leftIcon={<SignOut/>}
                                          onClick={this.props.onLogoutCallback}/>
                            </IconMenu>
                        }
                    />
                </MuiThemeProvider>
            </div>
        );
    }
}

NavbarUser.propTypes = {
    onLogoutCallback:PropTypes.func.isRequired,
};