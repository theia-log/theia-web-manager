import React, { Component } from 'react';

class Tag extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: null,
        };
    }

    render () {
        const { tag } = this.state;
        return (
            <div>{ tag }</div>
        );
    }
}