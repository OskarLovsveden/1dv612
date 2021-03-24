import { io } from 'socket.io-client'

export const connectSocket = (identifier) => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
        query: { identifier: '123' }
        // query: { identifier: identifier }
    })

    socket.on('webhook', data => {
        console.log(data)
    })

    return socket
}