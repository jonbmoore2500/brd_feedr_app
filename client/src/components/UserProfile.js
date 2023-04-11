import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext"
import EditUserForm from "./EditUserForm"
import EditUserPWForm from "./EditUserPWForm"
import "../modal.css"

function UserProfile({homePage = false}) {

    const {user} = useContext(UserContext)
    const [updateModal, setUpdateModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)    

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
                            setUpdateModal={setUpdateModal} 
                        />
                    </div>
                </div>
            )}
            {passwordModal && (
                <div className="modal">
                <div onClick={() => setPasswordModal(false)} className="overlay"></div> 
                <div className="modal-content">
                    <EditUserPWForm 
                        setPasswordModal={setPasswordModal} 
                    />
                </div>
            </div>
            )}
        </div>
    )
}

export default UserProfile