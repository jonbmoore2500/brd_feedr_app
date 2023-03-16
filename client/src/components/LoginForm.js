import React, {useState} from "react"

function LoginForm({setUser}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function handleLogin(e) {
        e.preventDefault()
        const loginObj = {
            username: username,
            password: password
        }
        
        fetch("/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginObj)
        })
        .then(r => r.json())
        .then(user => setUser(user))
    }

    return(
        <div>
            <form onSubmit={handleLogin}>
                <h3>Sign in</h3>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                    value={username}
                    placeholder="Enter your username"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    value={password}
                    placeholder="Enter your password"
                />
                <button type="submit">
                    Login
                </button>
            </form>
        </div>
    )

}


export default LoginForm