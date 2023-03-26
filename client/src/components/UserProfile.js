import React, {useState} from "react"
import EditUserForm from "./EditUserForm"
import EditUserPWForm from "./EditUserPWForm"
import "../modal.css"

function UserProfile({userDisp, homePage = false, updateUser}) {

    const [updateModal, setUpdateModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)    

    return (
        <div>
            <div className="user-info">
                <img src={userDisp.img_url} alt="chickadee" id="prof_pic"/>
                <h1>Username: {userDisp.username}</h1>
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
                    <>
                        <button onClick={() => {
                            setUpdateModal(true)
                            setPasswordModal(false)
                        }}>Update User Information</button>
                        <button onClick={() => {
                            setPasswordModal(true)
                            setUpdateModal(false)
                        }}>Update Password</button>  
                    </>
                ) : (
                    null 
                )}
            </div>
            {updateModal && (
                <div className="modal">
                    <div onClick={() => setUpdateModal(false)} className="overlay"></div> 
                    <div className="modal-content">
                        <EditUserForm 
                            userDisp={userDisp} 
                            setUpdateModal={setUpdateModal} 
                            updateUser={updateUser}
                        />
                    </div>
                </div>
            )}
            {passwordModal && (
                <div className="modal">
                <div onClick={() => setPasswordModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <EditUserPWForm 
                        userDisp={userDisp} 
                        setPasswordModal={setPasswordModal} 
                        updateUser={updateUser}
                    />
                </div>
            </div>
            )}
        </div>
    )

}

export default UserProfile