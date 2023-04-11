import React, {useState, useContext} from "react"
import { UserContext } from "../contexts/UserContext";
import { FeedersContext } from "../contexts/FeedersContext";
import EditRevForm from "./EditRevForm"

function ReviewCard({review, signedIn = false}) {

    let [showFeederInfo, setShowFeederInfo] = useState(false)
    const {user, setUser} = useContext(UserContext)
    const {setFeeders, findFeeder, feedersUpdateHelper} = useContext(FeedersContext)
    let revFeeder = findFeeder(review.feeder.id) // this review's feeder
    let date = `${review.updated_at.slice(5, 7)}/${review.updated_at.slice(8, 10)}/${review.updated_at.slice(2, 4)}`

    function starsFunc(num) {
        let solidStars = ["★", "★", "★", "★", "★"].slice(5-num)
        let hollowStars = ["☆", "☆", "☆", "☆", "☆"].slice(num)
        return solidStars.concat(hollowStars).join("")
    }
    const dispStars = starsFunc(review.rating)

    function handleEdit(updatedRev) {
        let userRevs = user.reviews.map((rev) => {
            if (rev.id === updatedRev.id) {
              rev = updatedRev
              return rev 
            }
            return rev
        })
        let updatedUser = {...user, reviews: userRevs}
        let newFeederRevs = revFeeder.reviews.map((review) => {
            if (review.id === updatedRev.id) {
                return updatedRev
            } else {
                return review
            }
        })
        let updatedFeeders = feedersUpdateHelper(newFeederRevs, revFeeder.id)
        setUser(updatedUser)
        setFeeders(updatedFeeders)
    }

    function handleDelete(deleteID) {
        let updatedUser = {
          ...user,
          reviews: user.reviews.filter(rev => rev.id !== deleteID),
          num_reviews: user.num_reviews - 1
        }
        let newFeederRevs = revFeeder.reviews.filter((rev) => rev.id !== deleteID)
        let updatedFeeders = feedersUpdateHelper(newFeederRevs, revFeeder.id)
        setUser(updatedUser)
        setFeeders(updatedFeeders)
    }

    return(
        <div className="review-card">
            <div className="review-title">
                <h1>{review.feeder.name}</h1>
                <h2>{dispStars}</h2>
            </div>
            <div className="review-contents" >
                <div onClick={() => setShowFeederInfo(!showFeederInfo)}>
                    <h3>Feeder Neighborhood: {review.feeder.neighborhood}</h3>
                    <h3>Your Rating: {review.rating} stars</h3>
                    <h3>Your Review: {review.text}</h3>
                    <h3>Reviewed on: {date}</h3>
                </div>
                {showFeederInfo ? (
                <>
                    <h4>&#40;Feeder total reviews: {review.feeder.num_reviews}&#41;</h4>
                    <h4>&#40;Feeder average rating: {review.feeder.average_rating}&#41;</h4>
                </>
                ) : (
                    null
                )}
                {signedIn ? (
                    <EditRevForm 
                        review={review} 
                        handleEdit={handleEdit}
                        handleDelete={handleDelete}
                    />
                ) : (
                    null
                )}
            </div>
        </div>
    )
}

export default ReviewCard