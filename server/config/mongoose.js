import mongoose from 'mongoose'

export const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log('Mongoose connection is open.'))
    mongoose.connection.on('error', err => console.error(`Mongoose connection error has occurred: ${err}`))
    mongoose.connection.on('disconnected', () => console.log('Mongoose connection is disconnected.'))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose connection is disconnected due to application termination.')
            process.exit(0)
        })
    })

    return mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

export const disconnectDB = async () => {
    mongoose.connection.close(() => {
        console.log('Mongoose is disconnected.')
        process.exit(0)
    })
}