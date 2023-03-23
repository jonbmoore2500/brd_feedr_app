import React, {useState} from "react"

function SignupForm({setUser}) {
    const [username, setUsername] = useState("")
    const [species, setSpecies] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [funFact, setFunFact] = useState("")
    const [pWord, setPWord] = useState("")
    const [pWordConfirm, setPWordConfirm] = useState("")

    const [errors, setErrors] = useState([])

    const neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]

    function handleSubmitSignup(e) {
        e.preventDefault()
        setErrors([])
        // console.log("hello")
        const newSignupObj = {
            username: username,
            species: species,
            img_url: imgURL,
            neighborhood: neighborhood,
            fun_fact: funFact,
            password: pWord,
            password_confirmation: pWordConfirm
        }
        console.log(newSignupObj)
        
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSignupObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((user) => setUser(user))
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmitSignup}>
                <h3>Sign up for a new account</h3>
                <input 
                    onChange={(e) => setUsername(e.target.value)} 
                    autoComplete="off"
                    value={username} 
                    placeholder="Enter a username"
                />
                <input
                    onChange={(e) => setSpecies(e.target.value)} 
                    autoComplete="off"
                    value={species} 
                    placeholder="Enter a species"
                /> 
                {/* could change species to dropdown */}
                <input
                    onChange={(e) => setImgURL(e.target.value)} 
                    autoComplete="off"
                    value={imgURL} 
                    placeholder="Enter a profile pic URL"
                /> 
                {/* <input 
                    onChange={(e) => setNeighborhood(e.target.value)} 
                    autoComplete="off"
                    value={neighborhood} 
                    placeholder="What neighborhood do you live in?"
                /> */}
                {/* will change neighborhood to dropdown */}
                <select onChange={(e) => setNeighborhood(e.target.value)}>
                    {neighborhoods.map((neighbor) => (
                        <option key={neighbor} value={neighbor}>{neighbor}</option>
                    ))}
                </select>
                <input 
                    onChange={(e) => setFunFact(e.target.value)} 
                    autoComplete="off"
                    value={funFact} 
                    placeholder="What's a fun fact about you?"
                />
                <input 
                    onChange={(e) => setPWord(e.target.value)} 
                    autoComplete="off"
                    value={pWord} 
                    placeholder="Enter your password"
                />
                <input 
                    onChange={(e) => setPWordConfirm(e.target.value)} 
                    autoComplete="off"
                    value={pWordConfirm} 
                    placeholder="Confirm your password"
                />
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