import React, { Component } from 'react';
import Console from '../component/Console';

import './consoleEmulator.css';

class ConsoleEmulator extends Component {
    
    consoleRef = null;

    render() {
        setInterval(() => {
            this.consoleRef.pushMessage();
        }, 500);
        return (
            <div className="console-emulator">
                <div className="title">something</div>
                <Console ref={(ref) => this.consoleRef = ref} />
            </div>
        )
    }
}

export default ConsoleEmulator;