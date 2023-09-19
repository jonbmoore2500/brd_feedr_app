import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"

function EditUserForm({setUpdateModal}) {

    const {user, setUser} = useContext(UserContext)
    const [neighborhood, setNeighborhood] = useState(user.neighborhood)
    const [funFact, setFunFact] = useState(user.fun_fact)
    const [errors, setErrors] = useState([])

    const neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]

    function handleUpdateUser(e) {
        e.preventDefault()
        setErrors([])
        const updatedUser = {
            neighborhood: neighborhood,
            fun_fact: funFact
        }
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
          })
          .then((r) => {
            if (r.ok) {
                r.json().then((newUser) => setUser({...newUser, reviews: user.reviews})) 
                setUpdateModal(false)
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
          }
        )    
    }

    return(
        <>
            <h3>Update your profile</h3>
            <form onSubmit={handleUpdateUser}>
                <select onChange={(e) => setNeighborhood(e.target.value)} defaultValue={user.neighborhood}>
                    {neighborhoods.map((neighbor) => (
                        <option key={neighbor} value={neighbor}>{neighbor}</option>
                    ))}
                </select>
                <input
                    onChange={(e) => setFunFact(e.target.value)}
                    autoComplete="off"
                    value={funFact}
                />
                {errors ? (
                    errors.map((err) => (
                        <h4 key={err}>{err}</h4>
                    ))
                ) : (
                    null
                )}
                <button type="submit">
                    Save changes
                </button>
            </form>
            <button onClick={() => setUpdateModal(false)}>Close</button>
        </>
    )
}

export default EditUserForm