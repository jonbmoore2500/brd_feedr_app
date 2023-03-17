import React, {useState} from "react"
import "../modal.css"

function UserProfile({userDisp, homePage = false, updateUser}) {

    const [updateModal, setUpdateModal] = useState(false)

    const [neighborhood, setNeighborhood] = useState(userDisp.neighborhood)
    const [funFact, setFunFact] = useState(userDisp.fun_fact)
    // add password change

    function handleUpdateUser(e) {
        e.preventDefault()
        const updatedData = {
            neighborhood: neighborhood,
            fun_fact: funFact
        }
        updateUser(updatedData) 
    }

    return (
        <div>
            <div className="user-info">
                <img src="https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg" alt="chickadee"/>
                <h2>Username: {userDisp.username}</h2>
                <h3>Species: {userDisp.species}</h3>
                <h3>Neighborhood: {userDisp.neighborhood}</h3>
                <h3>Fun Fact: {userDisp.fun_fact}</h3>
                <h3>Feeders Reviewed: </h3>
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
                        <h3>modal content</h3>
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

                        </form>
                        <button onClick={() => setUpdateModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default UserProfile