import React, {useState} from "react"

function LoginForm({setUser, setLoggedIn}) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [error, setError] = useState("")

    function handleLogin(e) {
        e.preventDefault()
        setError("")
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
        .then((r) => {
            if (r.ok) {
                r.json().then(user => {
                    setUser(user)
                    setLoggedIn(true)
                })
            } else {
                r.json().then((err) => setError(err.error))
            }
        })
    }

    return(
        <div className="user-form">
            <form onSubmit={handleLogin}>
                <h3>Sign in</h3>
                <label className="signup-label">Username: </label>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <br></br>
                <label className="signup-label">Password: </label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="off"
                    value={password}
                />
                <br></br>
                <br></br>
                <button type="submit">
                    Login
                </button>
            </form>
            {error ? (
                <h4>{error}</h4>
            ) : (
                null 
            )}
        </div>
    )

}


export default LoginForm