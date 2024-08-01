import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get("http://127.0.0.1:5000/api/users");
    console.log(response.data.users)
    setArray(response.data.users);
  }

  useEffect(() => {
    fetchAPI()
  }, [] );

  return (
    <>
      <div>
          {
            array.map((user, index) => (
              <div key={index}>
              <span> {user} </span>
              </div>
            ))
          }
      </div>
    </>
  )
}

export default App
