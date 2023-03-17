import React, {useState} from "react"
import "../modal.css"

function UserProfile({userDisp, homePage = false}) {

    const [updateModal, setUpdateModal] = useState(false)


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
                        
                    </div>
                </div>
            )}
        </div>
    )

}

export default UserProfile