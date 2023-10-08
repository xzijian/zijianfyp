import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useModulesContext } from '../hooks/useModulesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useParams } from 'react-router-dom'
import { useState } from "react"

const PostDetails = ({ post }) => {
  const { dispatch } = useModulesContext()
  const { user } = useAuthContext()
  const { id } = useParams()

  const [comment, setComment] = useState('')
  const [error, setError] = useState(null)

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('http://localhost:3001/api/module/' + id +'/' + post._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (response.ok) {  
      dispatch({type: 'DELETE_POST', payload: json})
    }
  }

  const postComment = async () => {
    if (!user){
      return
    }
    const body = {comment}
    const response = await fetch('http://localhost:3001/api/module/' + id +'/' + post._id, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setComment('')
      setError(null)
      dispatch({type: 'ADD_COMMENT', payload: json})
    }
  }
  
  const comments1 = post.comments

  if (post.authoremail === user.email){
    return (
      <div className="workout-details">
        <p><strong>{post.post}</strong></p>
        <p>{post.author} {" - "} {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true})}</p>
        <div>
            {post.comments && post.comments.map((comment) => (
              <p key={comment._id}>{comment.cauthor} {" : "} {comment.comment} {' - '} {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true})} </p>
            ))}
        </div>
        <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        <input 
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
      />
      <button onClick={postComment}>post</button>
      {error && <div className="error">{error}</div>}
      </div>
    )
  }else{
    return (
      <div className="workout-details">
        <p><strong>{post.post}</strong></p>
        <p>{post.author}</p> {" "} <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true})}</p>
        <div>{comments1.map((comment)=>{
          <p key={comment._id}>
            {comment.cauthor} {' : '} {comment.comment} {' - '} {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true})}
          </p>
        })}</div>
        <input 
          type="text"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
      />
      <button onClick={postComment}>post</button>
      {error && <div className="error">{error}</div>}
      </div>
    )
  }
}

export default PostDetails



