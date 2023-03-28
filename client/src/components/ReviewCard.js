import React from "react"
import EditRevForm from "./EditRevForm"

function ReviewCard({review, signedIn = false, handleDelete, handleEdit}) {

    console.log(review)
    let day = review.updated_at.slice(8, 10)
    let month = review.updated_at.slice(5, 7)
    let year = review.updated_at.slice(2, 4)
    let date = `${month}/${day}/${year}`

    function starsFunc(num) {
        let solidStars = ["★", "★", "★", "★", "★"].slice(5-num)
        let hollowStars = ["☆", "☆", "☆", "☆", "☆"].slice(num)
        return solidStars.concat(hollowStars).join("")
    }

    const dispStars = starsFunc(review.rating)

    return(
        <div className="review-card">
            <div className="review-title">
                <h1>{review.feeder.name}</h1>
                <h2>{dispStars}</h2>
            </div>
            <div className="review-contents">
                <h3>Feeder Neighborhood: {review.feeder.neighborhood}</h3>
                <h3>Your Rating: {review.rating} stars</h3>
                <h3>Your Review: {review.text}</h3>
                <h3>Reviewed on: {date}</h3>
                <h4>&#40;Total reviews for this feeder: {review.feeder.num_reviews}&#41;</h4>
                {signedIn ? (
                    <EditRevForm 
                        review={review} 
                        handleDelete={handleDelete} 
                        handleEdit={handleEdit}
                    />
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default ReviewCard