import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import AuthService from '../service/AuthService';
import ApplicationHeader from '../container/ApplicationHeader';
import ConsoleEmulator from '../container/ConsoleEmulator';

class IndexView extends Component {
    
    authService = AuthService.getInstance();

    render() {
        return !this.authService.isAuthenticated() ? (
            <Redirect to="/login"/>
        ) : (
            <Container>
                <ApplicationHeader />
                <ConsoleEmulator />
            </Container>
        );
    }
}

export default IndexView;
