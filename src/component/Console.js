import React, { Component } from 'react';
import './console.css';

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
        messageList: []
    };
    
    generateMessageList() {
        return this.state.messageList.map((message) => (
            <div key={Math.random()} ref={(ref) => this.lastMessage = ref} className="console-message">
                <div style={{color: this.colorPalette[message.type]}} className="console-date">[{message.date}]</div>
                <div className="console-marker">:</div>
                <div className="console-message">{message.text}</div>
            </div>
        ));
    }

    pushMessage(text = Math.random(), date = new Date().toString(), type = 'info') {
        let currentList = this.state.messageList;
        currentList.push({ date, type, text });
        this.setState({ messageList: currentList }, () => {
            this.lastMessage.parentNode.scrollTop = this.lastMessage.offsetTop;
        });
    }

    render() {
        return (
            <div className="console">
                {this.generateMessageList()}
            </div>
        );
    }
}

export default Console;