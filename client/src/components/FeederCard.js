import React, {useState} from "react"
import {Card} from "semantic-ui-react"
import RevForm from "./RevForm"

function FeederCard({feeder, userID, updateUserRevs}) {

    const [showReviewForm, setShowReviewForm] = useState(false)
    
    function checkReviewable() {
        let feederReviewable = true
        let birdIDs = feeder.reviews.map(rev => rev.bird_id)
        if (birdIDs.includes(userID)) {
            feederReviewable = false
        }
        return feederReviewable
    }
    
    let reviewable = checkReviewable()

    return(
        <Card >
                <h2>{feeder.name}</h2>
                <h4>Neighborhood: {feeder.neighborhood}</h4>
                {feeder.refill_freq === 1 ? (
                    <h4>Refilled every day</h4>
                ) : (
                    <h4>Refilled every {feeder.refill_freq} days</h4>
                )}
                {feeder.average_rating > 0 ? (
                <>
                    <h4>Average rating: {feeder.average_rating}</h4> 
                    <h4>Number of reviews: {feeder.num_reviews}</h4>
                </>
                ) : (
                <h4>Be the first to review this feeder!</h4>
                )}
                { reviewable ? (
                <button onClick={() => setShowReviewForm(true)}>
                    Review this feeder
                </button>
                ) : (
                <h4>You've already reviewed this one!</h4>
                )
                }

            {showReviewForm && (
                <div className="modal">
                    <div onClick={() => setShowReviewForm(false)} className="overlay"></div> 
                    <div className="modal-content">
                        <RevForm feeder={feeder} userID={userID} updateUserRevs={updateUserRevs} setShowReviewForm={setShowReviewForm}/>
                    </div>
                </div>
            )}
        </Card>
    )

}


export default FeederCard