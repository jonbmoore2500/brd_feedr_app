import React, {useState} from "react"

function SignupForm() {
    const [username, setUsername] = useState("")
    const [species, setSpecies] = useState("")
    const [imgURL, setImgURL] = useState("")
    const [neighborhood, setNeighborhood] = useState("")
    const [funFact, setFunFact] = useState("")
    const [pWord, setPWord] = useState("")
    const [pWordConfirm, setPWordConfirm] = useState("")

    function handleSubmitSignup(e) {
        e.preventDefault()
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
        .then(r => r.json())
        .then(data => console.log(data))
        // .then((r) => {
        //     if (r.ok) {
        //         r.json()
        //         .then(bird => console.log(bird, "confirmed"))
        //     }
        // })
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
                <input 
                    onChange={(e) => setNeighborhood(e.target.value)} 
                    autoComplete="off"
                    value={neighborhood} 
                    placeholder="What neighborhood do you live in?"
                />
                {/* will change neighborhood to dropdown */}
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
        </div>
    )

}

export default SignupForm