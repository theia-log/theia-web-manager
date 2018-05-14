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
            <div className="application-header">
                <Image centered src='/static/image/logo.png' size='tiny' />
                <Header as='h2' icon textAlign='center'>
                    Theia Web Manager
                    <Header.Subheader>
                        Manage your theia log agents.
                    </Header.Subheader>
                </Header>
                <Menu pointing>
                    <Menu.Item name='console' active={activeItem === 'console'} onClick={this.changeView} />
                    <Menu.Item name='agents' active={activeItem === 'agents'} onClick={this.changeView} />
                    <Menu.Menu position='right'>
                        <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.logout} />
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}

export default ApplicationHeader;