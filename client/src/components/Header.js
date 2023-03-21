import React from "react"
import NavBar from "./NavBar.js"
import Logout from "./Logout.js"

function Header({user, setUser}) {

return (
    <div >
        <div className="App-header">
            <h1>brd feedr</h1>
            { user ? <Logout user={user} setUser={setUser}/> : null}
            {/* move to right side of top bar 
            move NavBar to App, above routes for Home, Reviews, FF
            */}
        </div>
       { user ? <NavBar /> : null }
    </div>

)

}

export default Header