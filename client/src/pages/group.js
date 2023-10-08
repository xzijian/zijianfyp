import { useEffect }from 'react'
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useGroupsContext } from "../hooks/useGroupsContext"
import { useAuthContext } from "../hooks/useAuthContext"

import MessageDetails from '../components/MessageDetails'
import GroupAdd from '../components/GroupAdd'

export function Group() {
    const {messages, dispatch} = useGroupsContext()
    const {user} = useAuthContext()
    const { id } = useParams()

    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
        if (user) {
            fetchMessages()
        }
    }, [dispatch, user])

    const fetchMessages = async () => {
      const response = await fetch('http://localhost:3001/api/groups/messages/' + id, {
      headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
      dispatch({type: 'SET_MESSAGES', payload: json})
      console.log(json)
      }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (!user) {
        setError('You must be logged in')
        return
      }
      const message1 = {message}
      const response = await fetch('http://localhost:3001/api/groups/messages/' + id, {
        method: 'POST',
        body: JSON.stringify(message1),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()
  
      if (!response.ok) {
        setError(json.error)
        //setEmptyFields(json.emptyFields)
      }
      if (response.ok) {
        setMessage('')
        setError(null)
        //setEmptyFields([])
        dispatch({type: 'ADD_MESSAGE', payload: json})
      }
    }
    
  return (
      <div className='home'>
          <div className='scroll'>
              {messages && messages.map((message) => (
                  <MessageDetails key={message._id} message={message} />
          ))}
          </div>
      <GroupAdd/>
      <input 
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          //className={emptyFields.includes('name') ? 'error' : ''}
      />
      <button onClick={handleSubmit}>Post</button>
      {error && <div className="error">{error}</div>}
      </div>
    )
}
