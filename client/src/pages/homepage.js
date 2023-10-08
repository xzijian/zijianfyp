import { useEffect }from 'react'
import { useModulesContext } from "../hooks/useModulesContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ModuleDetails from '../components/ModuleDetails'
import ModuleForm from '../components/ModuleForm'

export function Homepage(){
  const {modules, dispatch} = useModulesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchModules = async () => {
      const response = await fetch('http://localhost:3001/api/modules', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      
      if (response.ok) {
        dispatch({type: 'SET_MODULE', payload: json})
      }
    }

    if (user) {
      fetchModules()
    }
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="workouts">
        {modules && modules.map((module) => (
          <ModuleDetails key={module._id} module={module} />
        ))}
      </div>
      <ModuleForm />
    </div>
  )
}