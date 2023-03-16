import React from "react"
import {NavLink} from "react-router-dom"

function NavBar() {

    return (
        <div>
            <h3> hello from the navbar</h3>
            <NavLink to="/" exact className="nav">Home</NavLink>
            <NavLink to="/view_reviews" exact className="nav">Your Reviews</NavLink>
            <NavLink to="/find_feeder" exact className="nav">Find a Feeder</NavLink>
        </div>
    )


}

export default NavBar