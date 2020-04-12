export class Event {

    constructor(id, timestamp, source, tags, content, extraHeaders=null) {
        this.id = id
        this.timestamp = timestamp
        this.source = source
        this.tags = tags || []
        this.content = content
        this.headers = extraHeaders || {}
    }

    toString() {
        const eventParts = [
            `id:${this.id}`,
            `timestamp:${this.getTimestamp()}`,
            `source:${this.source}`,
            `tags:${this.tags.join(',')}`
        ]
        
        for (const [key, value] of Object.entries(this.headers)) {
            eventParts.push(`${key}:${value}`)
        }
        eventParts.push(`${this.content}`)

        return eventParts.join('\n')
    }

    getTimestamp() {
        const milliseconds = this.timestamp.getMilliseconds()
        const seconds = this.timestamp.getTime()
        if (milliseconds) {
            return `${seconds}.${milliseconds}`
        }
        return `${seconds}`
    }
}

class EventPreamble {

    constructor(total, header, content, offset=0) {
        this.total = total
        this.header = header
        this.content = content
        this.offset = offset
    }

    withOffset(val) {
        return this.offset + val
    }

    getHeaderIndex() {
        return this.offset
    }

    getContentIndex() {
        return this.withOffset(this.header + 1)
    }
}

function parsePreamble(data) {
    const newline = '\n'.charCodeAt(0)
    let preamble = ''
    const view = new DataView(data)
    let i = 0
    while (i < data.byteLength) {
        const c = view.getUint8(i)
        if (c == newline){
            break
        }
        preamble += String.fromCharCode(c)
        i++
    }
    if (!preamble.startsWith('event')){
        throw new Error('Invalid preamble: ' + preamble)
    }
    preamble = preamble.split(' ')
    console.log(preamble)
    return new EventPreamble(
        parseInt(preamble[1]),
        parseInt(preamble[2]),
        parseInt(preamble[3]),
        i,
    )
}

export function parseEvent(data) {
    return new Promise((resolve, reject) => {
        try {
            const preamble = parsePreamble(data)
            const decoder = new TextDecoder('utf-8')
            const header = decoder.decode(data.slice(preamble.getHeaderIndex(), preamble.getContentIndex()))
            const content = decoder.decode(data.slice(preamble.getContentIndex()))
            
            const event = new Event()
            event.content = content.toString()
            if (event.content.endsWith('\n')) {
                // remove the extra newline that the server adds to the events
                event.content = event.content.slice(0, event.content.length - 1)
            }

            header.split('\n').forEach(line => {
                line = line.trim()
                if (line) {
                    line = line.split(':')
                    const key = line[0].trim()
                    let value = ''
                    if (line.length > 1) {
                        value = line[1].trim()
                    }
                    if(key === 'id') {
                        event.id = value
                    }else if (key === 'source') {
                        event.source = value
                    }else if (key === 'timestamp') {
                        const timestamp = parseFloat(value)
                        event.timestamp = new Date(timestamp)
                    }else if(key === 'tags') {
                        event.tags = value.split(',').filter(t => t.trim())
                    }else{
                        event.headers[key] = value
                    }
                }
            })

            resolve(event)
        } catch (e) {
            reject(e)
        }
    })
}
