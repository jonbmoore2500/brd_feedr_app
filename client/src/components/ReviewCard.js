import React from "react"
import EditRevForm from "./EditRevForm"

function ReviewCard({review, signedIn = false, handleDelete, handleEdit}) {

    return(
        <div className="review-card">
            <div className="review-title">
                <h1>{review.feeder.name}</h1>
            </div>
            <div className="review-contents">
                <h3>Neighborhood: {review.feeder.neighborhood}</h3>
                <h3>Rating: {review.rating}</h3>
                <h3>Review: {review.text}</h3>
                {signedIn ? (
                    <EditRevForm review={review} handleDelete={handleDelete} handleEdit={handleEdit}/>
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default ReviewCard