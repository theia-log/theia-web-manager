import React, { Component } from 'react';

import AuthService from '../service/AuthService';

class NotFoundView extends Component {
    
    authService = AuthService.getInstance();

    render() {
        return (
            <div>
             Not Found View
            </div>
        );
    }
}

export default NotFoundView;
