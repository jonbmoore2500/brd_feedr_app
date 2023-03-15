import React from "react"
import NavBar from "./NavBar.js"
import Logout from "./Logout.js"

function Header({user, setUser}) {

return (
    <div className="App-header">
        <div>
            <h1>brd feedr</h1>
            { user ? <Logout user={user} setUser={setUser}/> : null}
            {/* move to right side of top bar */}
        </div>
       { user ? <NavBar /> : null }
    </div>

)

}

export default Header