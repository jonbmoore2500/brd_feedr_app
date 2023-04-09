import React, {useState} from "react"

function SignupForm({setUser}) {
    const neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]
    
    const [username, setUsername] = useState("")
    const [species, setSpecies] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [neighborhood, setNeighborhood] = useState(neighborhoods[0])
    const [funFact, setFunFact] = useState("")
    const [pWord, setPWord] = useState("")
    const [pWordConfirm, setPWordConfirm] = useState("")

    const [errors, setErrors] = useState([])

    function handleSubmitSignup(e) {
        e.preventDefault()
        setErrors([])
        const newSignupObj = {
            username: username,
            species: species,
            img_url: imgURL,
            neighborhood: neighborhood,
            fun_fact: funFact,
            password: pWord,
            password_confirmation: pWordConfirm
        }
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSignupObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => {
                    setUser(user)
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div className="user-form">
            <form onSubmit={handleSubmitSignup}>
                <h3>Sign up for a new account</h3>
                <label className="signup-label">Username: </label>
                <input 
                    onChange={(e) => setUsername(e.target.value)} 
                    autoComplete="off"
                    value={username} 
                />
                <br></br>
                <label className="signup-label">Species: </label>
                <input
                    onChange={(e) => setSpecies(e.target.value)} 
                    autoComplete="off"
                    value={species} 
                /> 
                <br></br>
                <label className="signup-label">Image URL: </label>
                {/* could change species to dropdown */}
                <input
                    onChange={(e) => setImgURL(e.target.value)} 
                    autoComplete="off"
                    value={imgURL} 
                /> 
                <br></br>
                <label className="signup-label">Neighborhood: </label>
                <select onChange={(e) => setNeighborhood(e.target.value)}>
                    {neighborhoods.map((neighbor) => (
                        <option key={neighbor} value={neighbor}>{neighbor}</option>
                    ))}
                </select>
                <br></br>
                <label className="signup-label">Fun Fact: </label>
                <input 
                    onChange={(e) => setFunFact(e.target.value)} 
                    autoComplete="off"
                    value={funFact} 
                />
                <br></br>
                <label className="signup-label">Password: </label>
                <input 
                    onChange={(e) => setPWord(e.target.value)} 
                    autoComplete="off"
                    value={pWord} 
                />
                <br></br>
                <label className="signup-label">Confirm Password: </label>
                <input 
                    onChange={(e) => setPWordConfirm(e.target.value)} 
                    autoComplete="off"
                    value={pWordConfirm} 
                />
                <br></br>
                <br></br>
                <button type="submit">
                    Sign up
                </button>
            </form>
            {errors.length > 0 ? (
                <>
                    {errors.map((err) => (
                        <h4>{err}</h4>
                    ))}
                </>
            ) : (
                null
            )}
        </div>
    )
}

export default SignupForm