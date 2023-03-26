import React, {useState} from "react"

function RevForm({feeder, userID, updateUserRevs, setShowReviewForm}) {
    
    const [newRating, setNewRating] = useState("")
    const [newRevText, setNewRevText] = useState("")
    const [errors, setErrors] = useState([])

    function handleRevSubmit(e) {
        e.preventDefault()
        setErrors([])
        let newReviewObj = {
            bird_id: userID,
            feeder_id: feeder.id,
            rating: newRating,
            text: newRevText
        }
        fetch("/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReviewObj)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((rev) => {
                    updateUserRevs(rev)
                    setShowReviewForm(false)
                })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return(
        <>
            <h3>Create a review for {feeder.name}</h3>
            <form onSubmit={handleRevSubmit}>
                <input 
                    onChange={(e) => setNewRating(e.target.value)} 
                    autoComplete="off"
                    value={newRating} 
                    placeholder="Rating (1-5 stars)"
                />
                <input 
                    onChange={(e) => setNewRevText(e.target.value)} 
                    autoComplete="off"
                    value={newRevText} 
                    placeholder="Review text"
                />
                <button type="submit">
                    Save your rating
                </button>
            </form>
            {errors.length > 0 ? (
                errors.map((err) => (
                    <h5 key={err.index}>{err}</h5>
                ))
            ) : (
                null
            )}
            <button onClick={() => setShowReviewForm(false)}>
                Cancel
            </button>
        </>
    )
}

export default RevForm 