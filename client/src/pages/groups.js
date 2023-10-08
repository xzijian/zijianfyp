import { useEffect }from 'react'
import { useGroupsContext } from "../hooks/useGroupsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import '../styles/groups/groups.css'

// components
import GroupDetails from '../components/GroupDetails'
import GroupForm from '../components/GroupForm'

export function Groups(){
  const {groups, dispatch} = useGroupsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch('http://localhost:3001/api/groups', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_GROUP', payload: json})
      }
    }

    if (user) {
      fetchGroups()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {groups && groups.map((group) => (
          <GroupDetails key={group._id} group={group} />
        ))}
      </div>
      <GroupForm />
    </div>
  )
}