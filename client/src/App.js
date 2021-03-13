import { io } from 'socket.io-client'
// const socket = io(process.env.REACT_APP_SERVER_URL)
const socket = io('http://localhost:8000')

const App = () => {
  console.log(socket.id)

  return (
    <div className="App">
      Hello World!
    </div>
  )
}

export default App
