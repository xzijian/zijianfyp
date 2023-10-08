import { useEffect }from 'react'
import { useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext"
import { useProfile } from "../hooks/useProfile"
import { Alert } from 'react-native';

export function Profile(){
    const {user} = useAuthContext()
    const [name, setName] = useState('')
    const [course, setCourse] = useState('')
    const [year, setYear] = useState('')
    const {updateProfile, error, isLoading} = useProfile()

    const handleSubmit = async (e) => {
        Alert.alert('Profile updated successfully');
        e.preventDefault()
        if (name === ""){
            name = user.names
        }
        if (course === ""){
            course = user.course
        }
        if (year === ""){
            year = user.year
        }
        await updateProfile(user.email, name, course, year)
        user.names = name
        user.course = course
        user.year = year
    }
    return (
        <form className="profile" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        
        <label>Name:</label>
        <input 
        type="text" 
        defaultValue={user.names} 
        onChange={(e) => setName(e.target.value)} 
        />
        <label>Course:</label>
        <input 
        type="text" 
        defaultValue={user.course} 
        onChange={(e) => setCourse(e.target.value)} 
        />
        <label>Year:</label>
        <input 
        type="text" 
        defaultValue={user.year}
        onChange={(e) => setYear(e.target.value)} 
        />

        <button disabled={isLoading}>Update</button>
        {error && <div className="error">{error}</div>}
    </form>
    )
}