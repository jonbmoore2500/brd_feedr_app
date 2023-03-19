import React from "react"

function ReviewCard({review, signedIn = false}) {

    return(
        <div>
            <h3>Feeder: {review.feeder.name}</h3>
            <h3>Rating: {review.rating}</h3>
            <h3>Review: {review.text}</h3>
            {signedIn ? (
                <div>
                    <button >Edit</button>
                    <button >Delete</button>
                </div>
            ) : (
                null
            )}
        </div>

    )

}

export default ReviewCard