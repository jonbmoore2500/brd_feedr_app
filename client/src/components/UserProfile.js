import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import EditUserForm from "./EditUserForm"
import EditUserPWForm from "./EditUserPWForm"
import "../modal.css"

function UserProfile({homePage = false}) {

    const {user, setUser} = useContext(UserContext)
    const [updateModal, setUpdateModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)    

    function handleUserUpdate(newUser) {
        let updatedUser = {
          ...user,
          neighborhood: newUser.neighborhood,
          fun_fact: newUser.fun_fact,
          password_digest: newUser.password_digest
        }
        setUser(updatedUser)
    }

    return (
        <div>
            <div className="user-info">
                <img src={user.img_url} alt="user profile pic" id="prof_pic"/>
                <h1>Username: {user.username}</h1>
                <h3>Species: {user.species}</h3>
                <h3>Neighborhood: {user.neighborhood}</h3>
                <h3>Fun Fact: {user.fun_fact}</h3>
                <h3>Feeders Reviewed: {user.num_reviews}</h3>
                {user.num_reviews === 0 ? (
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
                            userNeighbor={user.neighborhood} 
                            userFunFact={user.fun_fact}
                            userID={user.id} 
                            setUpdateModal={setUpdateModal} 
                            updateUser={handleUserUpdate}
                        />
                    </div>
                </div>
            )}
            {passwordModal && (
                <div className="modal">
                <div onClick={() => setPasswordModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <EditUserPWForm 
                        userID={user.id} 
                        setPasswordModal={setPasswordModal} 
                        updateUser={handleUserUpdate}
                    />
                </div>
            </div>
            )}
        </div>
    )
}

export default UserProfile