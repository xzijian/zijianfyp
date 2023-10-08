import { useState } from "react"
import { useGroupsContext } from "../hooks/useGroupsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const GroupForm = () => {
  const { dispatch } = useGroupsContext()
  const { user } = useAuthContext()

  const [groupname, setGroupname] = useState('')
  const [coursename, setName] = useState('')
  const [error, setError] = useState(null)
  //const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      /////
      ///
      
      return
    }
    const email = user.email
    const group = {groupname, coursename, email}
    const response = await fetch('http://localhost:3001/api/groups', {
      method: 'POST',
      body: JSON.stringify(group),
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
      setName('')
      setGroupname('')
      setError(null)
      //setEmptyFields([])
      dispatch({type: 'CREATE_GROUP', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Create a new group</h3>

      <label>Group Name:</label>
      <input 
        type="text"
        onChange={(e) => setGroupname(e.target.value)}
        value={groupname}
        //className={emptyFields.includes('name') ? 'error' : ''}
      />

      <label>Module:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={coursename}
        //className={emptyFields.includes('name') ? 'error' : ''}
      />
      

      <button>Create</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default GroupForm