import { useEffect }from 'react'
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useModulesContext } from "../hooks/useModulesContext"
import { useAuthContext } from "../hooks/useAuthContext"

import PostDetails from "../components/PostDetails"

export function Module() {
    const {posts, students, dispatch} = useModulesContext()
    const {user} = useAuthContext()
    const { id } = useParams()
    
    const [post, setPost] = useState('')
    const [error, setError] = useState(null)

    useEffect(() => {
      if (user) {
        fetchPosts()
      }
    }, [dispatch, user])

    const fetchPosts = async () => {
      const response = await fetch('http://localhost:3001/api/module/' + id, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const response1 = await fetch('http://localhost:3001/api/modules/' + id, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      const json1 = await response1.json()

      if (response.ok && response1.ok) {
        const json2 = [json, json1]
        dispatch({type: 'SET_POSTS', payload: json2})
      }
    }
  
    const handleSubmit = async (e) => {
      e.preventDefault()
  
      if (!user) {
        setError('You must be logged in')
        return
      }
      const post1 = {post}
      const response = await fetch('http://localhost:3001/api/module/' + id, {
        method: 'POST',
        body: JSON.stringify(post1),
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
        setPost('')
        setError(null)
        //setEmptyFields([])
        dispatch({type: 'ADD_POST', payload: json})
        fetchPosts()
      }
    }
    console.log(posts)
    return (
      <div className='home'>
        <input 
          type="text"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          //className={emptyFields.includes('name') ? 'error' : ''}
      />
      <button onClick={handleSubmit}>Post</button>
      {error && <div className="error">{error}</div>}
        <div className="workouts">
          {posts && posts.map((post) => (
            <PostDetails key={post._id} post={post} />
          ))}
        </div>
        <p><strong>Students:</strong>{students && students.map(students => <p>{students}</p>)}</p>
      </div>
    )
}
