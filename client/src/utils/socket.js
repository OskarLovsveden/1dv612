import { io } from 'socket.io-client'

export const connectSocket = (identifier) => {
    const socket = io(process.env.REACT_APP_SERVER_URL, {
        query: { identifier: identifier }
    })

    socket.on('webhook', data => {
        console.log('WEBHOOK RECEIVED ON CLIENT')
    })

    return socket
}