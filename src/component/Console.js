import React, { Component } from 'react';
import './console.css';
import { EventItem } from './EventItem';

class Console extends Component {
    
    colorPalette = {
        error: '#dc1414',
        warn: '#dc1414',
        info: '#dc1414',
        debug: '#dc1414',
        trace: '#dc1414'
    };

    lastMessage = null;

    state = {
        messageList: [],
        idSeq: 0,
    };
    
    generateMessageList() {
        let idSeq = 0;
        return this.state.messageList.map((message) => {
            console.log(message)
            return <EventItem id="PAJO" content={message.text} key={idSeq++}></EventItem>
        });
    }

    pushMessage(text = Math.random(), date = new Date().toString(), type = 'info') {
        let currentList = this.state.messageList;
        currentList.push({ date, type, text });
        this.setState({ messageList: currentList }, () => {
            //this.lastMessage.parentNode.scrollTop = this.lastMessage.offsetTop;
        });
    }

    render() {
        console.log(Console.prototype)
        return (
            <div className="console">
                {this.generateMessageList()}
            </div>
        );
    }
}

export default Console;