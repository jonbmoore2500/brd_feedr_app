import React from "react"

import UserProfile from "./UserProfile"
import ReviewCard from "./ReviewCard"

function UserRevContainer({reviews, handleDelete, handleEdit}) {

    function handleSort() {
        let userReviews = [...reviews]
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
                                handleDelete={handleDelete} 
                                handleEdit={handleEdit}
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