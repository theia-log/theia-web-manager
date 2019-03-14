import React, { Component } from 'react';
import { Header, Image, Menu } from 'semantic-ui-react'

import './applicationHeader.css';

class ApplicationHeader extends Component {

    state = {
        activeItem: 'console'
    };

    changeView = (e, { name }) => {
        this.setState({ activeItem: name });
    }

    logout = (e) => {
        
    }

    render() {
        const { activeItem } = this.state;
        return (
            <div class="application-header">
            <Header icon textAlign='center'>
                <Menu>
                    <Menu.Item name="logo">
                        <Image centered src="/static/image/logo.png" size="mini"/>
                    </Menu.Item>
                    <Menu.Item name='console' active={activeItem === 'console'} onClick={this.changeView} />
                    <Menu.Item name='agents' active={activeItem === 'agents'} onClick={this.changeView} />
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.logout} />
                    </Menu.Menu>
                </Menu>
            </Header>
            </div>
        );

    }
}

export default ApplicationHeader;