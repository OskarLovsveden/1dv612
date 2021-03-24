import { createServer } from 'http'
import { Server as socket } from 'socket.io'

// TODO - Socket model/database
export let connections = []

export const connectSocket = (app) => {

    const server = createServer(app)
    const io = new socket(server, {
        cors: {
            origin: '*'
        }
    })

    app.set('io', io)


    io.on('connection', (socket) => {
        const identifier = socket.handshake.query.identifier

        const index = connections.findIndex((c) => c.identifier === identifier)
        if (index !== -1) {
            connections[index] = { ...connections[index], socket_id: socket.id }
        } else {
            connections.push({
                socket_id: socket.id,
                identifier: identifier
            })
        }
    })

    return server
}