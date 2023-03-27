import React from "react"
import {useHistory} from "react-router-dom"

function Logout({user, setUser}) {

    const history = useHistory()

    function handleLogout() {
        fetch("/logout", {method: "DELETE"})
        .then((r) => {
            if (r.ok) {
                setUser(null)
                history.push("/")
            }
        })
    }
    
    return(
        <div id="logout">
            <h4 className="logout-text">Current user: </h4>
            <h3 className="logout-text">{user.username}</h3>
            {/* add mini picture */}
            <button onClick={handleLogout} className="logout-text">Logout</button>
        </div>
    )
}

export default Logout