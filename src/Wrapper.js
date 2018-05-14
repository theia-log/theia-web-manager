import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import History from './helper/History';

import IndexView from './view/IndexView';
import LoginView from './view/LoginView';
import NotFoundView from './view/NotFoundView';

class Wrapper extends Component {
    
    history = History.getInstance();

    render() {
        return (
            <div>
                <ToastContainer />
                <Router history={this.history.api}>
                    <Switch>
                        <Route exact path="/" component={IndexView} />
                        <Route exact path="/login" component={LoginView} />
                        <Route exact component={NotFoundView} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Wrapper;