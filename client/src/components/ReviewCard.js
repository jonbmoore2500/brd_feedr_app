import React from "react"
import EditRevForm from "./EditRevForm"

function ReviewCard({review, signedIn = false}) {

    function handleEdit(newReview) {
        console.log("hello", newReview)
    }

    function handleDelete(deleteID) {
        fetch(`/reviews/${deleteID}`, {method: "DELETE"})
        .then(r => r.json()).then(data => console.log(data))
    }

    return(
        <div>
            <h3>Feeder: {review.feeder.name}</h3>
            <h3>Rating: {review.rating}</h3>
            <h3>Review: {review.text}</h3>
            {signedIn ? (
                <EditRevForm review={review} handleDelete={handleDelete} handleEdit={handleEdit}/>
            ) : (
                null
            )}
        </div>

    )

}

export default ReviewCard