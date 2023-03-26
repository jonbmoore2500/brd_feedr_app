import React from "react"

import UserProfile from "./UserProfile"
import ReviewCard from "./ReviewCard"

function UserRevContainer({user, handleDelete, handleEdit}) {

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
                    <UserProfile userDisp={user}/>
                </div>
                <div className="right_reviews">
                    <h2>Your Reviews: </h2>
                    {dispRevs.map((rev) => (
                        <ReviewCard 
                            key={rev.id} 
                            review={rev} 
                            signedIn={true} 
                            handleDelete={handleDelete} 
                            handleEdit={handleEdit}
                        />
                    ))}
                </div>
            </div>
        </div>
    )

}

export default UserRevContainer