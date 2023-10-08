import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MessageDetails = ({ message }) => {
  return (
    <div className="workout-details">
      <p><strong>{message.message}</strong></p>
      <p>{message.author}</p> {" "} <p>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true})}</p>
    </div>
  )
}

export default MessageDetails