import { useModulesContext } from '../hooks/useModulesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { Link } from 'react-router-dom'

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ModuleDetails = ({ module }) => {
  const { dispatch } = useModulesContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('http://localhost:3001/api/modules/' + module._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_MODULE', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <Link to={"/module/" + module._id}>
        <h4>{module.name}</h4>
      </Link>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default ModuleDetails