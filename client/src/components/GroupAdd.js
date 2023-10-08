import { useState } from "react"
import { useGroupsContext } from "../hooks/useGroupsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from "react-router-dom"
import { Link, Navigate} from 'react-router-dom'

const GroupForm = () => {
  const { dispatch } = useGroupsContext()
  const { user } = useAuthContext()
  const { id } = useParams()

  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [redirect, setRedirect] = useState('')
  //const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    const group = {email}
    const response = await fetch('http://localhost:3001/api/groups/' + id, {
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
      setEmail('')
      setError(null)
      //setEmptyFields([])
      dispatch({type: 'ADD_MEMBER', payload: json})
    }
  }

  const handleSubmit2 = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    const useremail = user.email
    const form = {useremail, id}
    const response = await fetch('http://localhost:3001/api/groups/' + id, {
      method: 'DELETE',
      body: JSON.stringify(form),
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
      setEmail('')
      setError(null)
      //setEmptyFields([])
      dispatch({type: 'DELETE_GROUP', payload: json})
      setRedirect("true")
    }
  }
  if (redirect === "true"){
    return <Navigate to="/groups"/>
  }
  return (  
    <form className="create">
      <h3>Add Member</h3>

      <label>Student's Email:</label>
      <input 
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        //className={emptyFields.includes('name') ? 'error' : ''}
      />
      
      <Link to="/groups"><button onClick={handleSubmit2}>Leave Group</button></Link> {" "} <button onClick={handleSubmit}>Add</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default GroupForm