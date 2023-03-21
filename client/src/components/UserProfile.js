import React, {useState} from "react"
import "../modal.css"

function UserProfile({userDisp, homePage = false, updateUser}) {

    const [updateModal, setUpdateModal] = useState(false)
    const [errors, setErrors] = useState([])

    const [neighborhood, setNeighborhood] = useState(userDisp.neighborhood)
    const [funFact, setFunFact] = useState(userDisp.fun_fact)
    // add password change

    function handleUpdateUser(e) {
        e.preventDefault()
        setErrors([])
        const updatedUser = {
            neighborhood: neighborhood,
            fun_fact: funFact
        }
        //console.log(userDisp.id, "user id", updatedData)
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
          
      
         
    }

    return (
        <div>
            <div className="user-info">
                <img src="https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg" alt="chickadee" id="prof_pic"/>
                <h2>{userDisp.username}</h2>
                <h3>Species: {userDisp.species}</h3>
                <h3>Neighborhood: {userDisp.neighborhood}</h3>
                <h3>Fun Fact: {userDisp.fun_fact}</h3>
                <h3>Feeders Reviewed: {userDisp.num_reviews}</h3>
                {userDisp.num_reviews === 0 ? (
                    <h4>Go to Find a Feeder to write your first review!</h4>
                ) : (
                    null
                )}
                {homePage ? (
                    <button onClick={() => setUpdateModal(true)}>Update User Information</button> 
                ) : (
                    null 
                )}
            </div>
            {updateModal && (
                <div className="modal">
                    <div onClick={() => setUpdateModal(false)} className="overlay"></div> 
                    <div className="modal-content">
                        <h3>Update your profile</h3>
                        <form onSubmit={handleUpdateUser}>
                            <input 
                                onChange={(e) => setNeighborhood(e.target.value)}
                                autoComplete="off"
                                value={neighborhood}
                            />
                            {/* change neighborhood to drop down */}
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
                    </div>
                </div>
            )}
        </div>
    )

}

export default UserProfile