import React from "react"

function Logout({user, setUser}) {

    function handleLogout() {
        fetch("/logout", {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }
    
    return(
        <div>
            <h3>{user.username}</h3>
            {/* add mini picture */}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Logout