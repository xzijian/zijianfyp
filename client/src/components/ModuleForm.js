import { useState } from "react"
import { useModulesContext } from "../hooks/useModulesContext"
import { useAuthContext } from '../hooks/useAuthContext'

const ModuleForm = () => {
  const { dispatch } = useModulesContext()
  const { user } = useAuthContext()

  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  //const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }
    const email = user.email
    const module = {name, email}
    const response = await fetch('http://localhost:3001/api/modules', {
      method: 'POST',
      body: JSON.stringify(module),
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
      setError(null)
      //setEmptyFields([])
      dispatch({type: 'CREATE_MODULE', payload: json})
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Module</h3>

      <label>Add Module:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        //className={emptyFields.includes('name') ? 'error' : ''}
      />

      <button>Add Module</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default ModuleForm