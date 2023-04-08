import React, {useContext} from "react";
import { UserContext } from "../contexts/UserContext.js"
import SignupForm from './SignupForm.js'
import LoginForm from "./LoginForm.js"


function UserFormsContainer() {

    const {setUser} = useContext(UserContext)

    return(
        <div id="user-forms-parent">
            <SignupForm setUser={setUser}/>
            <LoginForm setUser={setUser}/>
        </div> 
    )
}

export default UserFormsContainer
