import { Link } from 'react-router-dom'

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const GroupDetails = ({ group }) => {
  return (
    <div className="workout-details">
      <Link to={"/groups/" + group._id}>
        <h4>{group.groupname}</h4>
      </Link>
      <p><strong>Course:</strong>{group.coursename}</p>
      <p><strong>Members:</strong>{group.members.map(members => <p>{members}</p>)}</p>
    </div>
  )
}

export default GroupDetails