import React, { Component } from 'react';

class EventItem extends Component {

    render () {
        return (
            <div class="event-item">
                <div class="event-id"></div>
                <div class="event-timestamp"></div>
                <div class="event-source"></div>
                <div class="event-tags"></div>
                <div class="event-content"></div>
            </div>
        );
    }
}