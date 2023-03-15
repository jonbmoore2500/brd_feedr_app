import React from "react"

function Logout({user}) {

    return(
        <div>
            <h3>{user.username}</h3>
            {/* add mini picture */}
            <button>Logout</button>
        </div>
    )
}

export default Logout