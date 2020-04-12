import React, { Component } from 'react';

export class EventItem extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const {id, timestamp, source, tags, content} = this.props;
        return (
            <div className="event-item">
                <div className="event-id">{ id }</div>
                <div className="event-timestamp">{ timestamp }</div>
                <div className="event-source">{ source }</div>
                <div className="event-tags">{ tags }</div>
                <div className="event-content">{ content }</div>
            </div>
        );
    }
}

export default EventItem;