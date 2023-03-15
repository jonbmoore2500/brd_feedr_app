import React from "react"

function UserProfile({userDisp}) {

    return (
        <div className="user-info">
            <img src="https://www.allaboutbirds.org/guide/assets/photo/302469081-480px.jpg" alt="chickadee"/>
            <h2>Username</h2>
            <h3>Species</h3>
            <h3>Home neighborhood</h3>
            <h3>fun fact</h3>
            <h3>number of reviews</h3>
            <h3>EDIT BUTTON</h3>

            {userDisp? <h3>yes user</h3> : <h3>no user</h3>}
        </div>
    )

}

export default UserProfile