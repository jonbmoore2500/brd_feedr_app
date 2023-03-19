import React, {useState} from "react"

function FeederCard({feeder, userID}) {

    const [showReviewForm, setShowReviewForm] = useState(false)
    const [newRating, setNewRating] = useState("")
    const [newRevText, setNewRevText] = useState("")
    const [errors, setErrors] = useState([])
    
    function handleRevSubmit(e) {
        e.preventDefault()
        // fetch POST review
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
                r.json().then((review) => console.log(review, "successful review"))
                setShowReviewForm(false)
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return(
        <div>
            <h2>{feeder.name}</h2>
            <h4>Neighborhood: {feeder.neighborhood}</h4>
            {feeder.refill_freq === 1 ? (
                <h4>Refilled every day</h4>
            ) : (
                <h4>Refilled every {feeder.refill_freq} days</h4>
            )}
            <h4>Average rating: ****</h4>
            <h4>Number of reviews: ****</h4>
            <button onClick={() => setShowReviewForm(true)}>
                Review this feeder
            </button>

            {showReviewForm && (
                <div className="modal">
                    <div onClick={() => setShowReviewForm(false)} className="overlay"></div> 
                    <div className="modal-content">
                        {/* new form component? could even component out modal entirely and pass down which form to include */}
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
                    </div>
                </div>
            )}
        </div>
    )

}


export default FeederCard