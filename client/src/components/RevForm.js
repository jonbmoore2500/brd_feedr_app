import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext";
import { FeedersContext } from "../contexts/FeedersContext";

function RevForm({feeder, setShowReviewForm}) {

    const {user, setUser} = useContext(UserContext)
    const {feeders, setFeeders} = useContext(FeedersContext)
    
    const [newRating, setNewRating] = useState("")
    const [newRevText, setNewRevText] = useState("")
    const ratings = feeder.reviews.map(rev => rev.rating)
    const [errors, setErrors] = useState([])

    function handleRevSubmit(e) {
        e.preventDefault()
        setErrors([])
        let newReviewObj = {
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
                    let updatedUser = {
                        ...user, 
                        reviews: [...user.reviews, rev],
                        num_reviews: user.num_reviews + 1
                    }
                    let updatedFeeders = feeders.map((feeder) => {
                        if (feeder.id === rev.feeder.id) {
                        feeder = {
                            ...feeder, 
                            num_reviews: feeder.num_reviews + 1, 
                            average_rating: (ratings.reduce((a,b) => a+b, 0) + rev.rating)/(feeder.num_reviews+1).toFixed(2),
                            reviews: [...feeder.reviews, rev]
                        }
                        return feeder 
                        }
                        return feeder
                    })
                    setUser(updatedUser)
                    setFeeders(updatedFeeders)
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