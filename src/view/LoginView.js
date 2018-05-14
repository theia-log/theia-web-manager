import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import AuthService from '../service/AuthService';

class LoginView extends Component {
    
    authService = AuthService.getInstance();

    render() {
        return this.authService.isAuthenticated() ? (
            <Redirect to="/"/>
        ) : (
            <div>
                Login View
            </div>
        );
    }
}

export default LoginView;
