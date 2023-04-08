import React from "react"
import NavBar from "./NavBar.js"
import Logout from "./Logout.js"

function Header({loggedIn, setLoggedIn}) {

return (
    <div className="Main-header">
        <div className="App-header">
            <h1 id="app-title">brd feedr</h1>
            { loggedIn ? <Logout setLoggedIn={setLoggedIn}/> : null}
        </div>
       { loggedIn ? <NavBar /> : null }
    </div>
)

}

export default Header