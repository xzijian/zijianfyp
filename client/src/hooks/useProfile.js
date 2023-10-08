import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useProfile = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const updateProfile = async (email, name, course, year) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('http://localhost:3001/api/user/profile', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name, course, year })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      setIsLoading(false)
    }
  }
  return { updateProfile, isLoading, error }
}
