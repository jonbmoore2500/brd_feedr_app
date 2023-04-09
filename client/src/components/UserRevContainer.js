import React, {useContext} from "react"

import { UserContext } from "../contexts/UserContext";
import { FeedersContext } from "../contexts/FeedersContext";

import UserProfile from "./UserProfile"
import ReviewCard from "./ReviewCard"

function UserRevContainer() {

    const {user, setUser} = useContext(UserContext)
    const {feeders, setFeeders} = useContext(FeedersContext)

    function handleRevEdit(updatedRev) {
        let userRevs = user.reviews.map((rev) => {
          if (rev.id === updatedRev.id) {
            rev = updatedRev
            return rev 
          }
          return rev
        })
        let updatedUser = {
          ...user,
          reviews: userRevs
        }
        setUser(updatedUser)
    }

    function handleRevDelete(deleteID, updatedFeeder) {
        let updatedUser = {
          ...user,
          reviews: user.reviews.filter(rev => rev.id !== deleteID),
          num_reviews: user.num_reviews - 1
        }
        let updatedFeeders = feeders.map((feeder) => {
          if (feeder.id === updatedFeeder.id) {
            feeder = updatedFeeder
            return feeder 
          }
          return feeder
        })
        setUser(updatedUser)
        setFeeders(updatedFeeders)
    }
    
    function handleSort() {
        let userReviews = [...user.reviews]
        userReviews = userReviews.sort(function (a, b) {
            if (a.feeder.name < b.feeder.name) {return -1} 
            if (a.feeder.name > b.feeder.name) {return 1}
            return 0}
            )
        return userReviews
    }

    const dispRevs = handleSort()

    return(
        <div>
            <div className="user_revs_container">
                <div className="left_prof">
                    <UserProfile/>
                </div>
                <div className="right_reviews">
                    <h1>Your Reviews: </h1>
                    { dispRevs.length > 0 ? (
                    <>
                        {dispRevs.map((rev) => (
                            <ReviewCard 
                                key={rev.id} 
                                review={rev} 
                                signedIn={true} 
                                handleDelete={handleRevDelete} 
                                handleEdit={handleRevEdit}
                            />
                        ))}
                    </>
                    ) : (
                    <>
                        <h2>No reviews to display</h2>
                        <h3>Go to Find a Feeder to create your first review</h3>
                    </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserRevContainer