import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { use } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <>
      <h1>Users</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.map(user => (
          <li
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 15px",
              marginBottom: "8px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <span style={{ fontWeight: "bold" }}>{user.username}: </span>
            <span style={{ color: "#ffffff" }}>{" "+user.email}</span>
          </li>
        ))}
      </ul>

    </>
  )
}

export default App
