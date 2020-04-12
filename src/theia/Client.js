import { parseEvent } from "./Event"

export class Channel {

    constructor(socket, onclose) {
        this.socket = socket
        this.onclose = onclose
    }

    close(code, reason) {
        return new Promise((resolve, reject) => {
            this.socket.addEventListener('close', (ev) => {
                try{
                    if (this.onclose) {
                        this.onclose(this)
                    }
                }catch (e) {
                    reject(e)
                }
                resolve(this)
            })
            this.socket.close(code, reason)
        })
    }
}

export class ReceiverChannel extends Channel {

    constructor(socket, onclose){
        super(socket, onclose)
    }

    receiveMessage(message) {
        console.log(message)
        if (message == 'ok') {
            // status message, can be safely ignored
            return
        }
        if (message.startsWith('{')) {
            // JSON message, error from the server
            const msg = JSON.parse(message)
            throw new Error(msg.error)
        }
        console.log('message->', message)
        return parseEvent(message)
    }

    onEvent(callback) {
        this.socket.addEventListener('message', (message) => {
            if(message.data){
                if (typeof(message.data) === 'string'){
                    if(message.data === 'ok'){
                        return
                    }
                    if(message.data.startsWith('{')){
                        const error = JSON.parse(message.data)
                        throw new Error(error.error)
                    }
                    throw new Error('Unknown message: ' + message.data)
                }
                message.data.arrayBuffer().then(buff => {
                    parseEvent(buff)
                    .then(event => {
                        callback(event)
                    })
                    .catch((reason) => {
                        console.error(reason)
                    }).catch(err => {
                        console.error(err)
                    })
                })
            }
        })
    }
}

export class Client {

    constructor(host='localhost', port=6433, secure=false) {
        this.host = host
        this.port = port
        this.secure = secure

        this.receivers = {}
        this.sender = null
    }

    getServerUrl() {
        const protocol = this.secure ? 'wss' : 'ws'
        return `${protocol}://${this.host}:${this.port}`
    }

    getEndpoint(path) {
        const serverHost = this.getServerUrl()
        return `${serverHost}/${path}`
    }

    receive(endpoint, query) {
        return new Promise((resolve, reject) => {
            const socket = new WebSocket(this.getEndpoint(endpoint))
            socket.addEventListener('open', () => {
                const channel = new ReceiverChannel(socket, (chan) => {
                    if (this.receivers[chan]) {
                        delete this.receivers[chan]
                    }
                })
                this.receivers[channel] = channel
                resolve(channel)
                socket.send(JSON.stringify(query))
            })
        })
    }

    find(query) {
        return this.receive('find', query)
    }

    live(query) {
        return this.receive('live', query)
    }

    event(ev) {

    }
}