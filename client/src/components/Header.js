import React from "react"
import NavBar from "./NavBar.js"
import Logout from "./Logout.js"

function Header({user, setUser}) {

return (
    <div className="Main-header">
        <div className="App-header">
            <h1 id="app-title">brd feedr</h1>
            { user ? <Logout user={user} setUser={setUser}/> : null}
        </div>
       { user ? <NavBar /> : null }
    </div>

)

}

export default Header