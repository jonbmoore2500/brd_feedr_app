import React, {useState} from "react"

function EditUserForm({userDisp, setUpdateModal, updateUser}) {
    
    const [neighborhood, setNeighborhood] = useState(userDisp.neighborhood)
    const [funFact, setFunFact] = useState(userDisp.fun_fact)
    const [errors, setErrors] = useState([])

    const neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]

    function handleUpdateUser(e) {
        e.preventDefault()
        setErrors([])
        const updatedUser = {
            neighborhood: neighborhood,
            fun_fact: funFact
        }
        fetch(`/birds/${userDisp.id}`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
          })
          .then((r) => {
            if (r.ok) {
                r.json().then((user) => updateUser(user)) 
                setUpdateModal(false)
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
          })    
          // doesn't work!
    }

    return(
        <>
            <h3>Update your profile</h3>
            <form onSubmit={handleUpdateUser}>
                <select onChange={(e) => setNeighborhood(e.target.value)} defaultValue={userDisp.neighborhood}>
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