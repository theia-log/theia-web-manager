import React, { Component } from 'react';

export class EventItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const {id, timestamp, source, tags, content} = this.state;
        return (
            <div class="event-item">
                <div class="event-id">{ id }</div>
                <div class="event-timestamp">{ timestamp }</div>
                <div class="event-source">{ source }</div>
                <div class="event-tags">{ tags }</div>
                <div class="event-content">{ content }</div>
            </div>
        );
    }
}

export default EventItem;