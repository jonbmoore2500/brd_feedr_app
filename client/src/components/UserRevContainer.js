import React from "react"

import UserProfile from "./UserProfile"
import ReviewCard from "./ReviewCard"

function UserRevContainer({user, handleEdit}) {
console.log(user)

    return(

        <div>
            
            <div className="user_revs_container">
                <div className="left_prof">
                    <UserProfile userDisp={user}/>
                </div>
                <div className="right_reviews">
                    <h2>Your Reviews: </h2>
                    {user.reviews.map((rev) => (
                        <ReviewCard key={rev.id} review={rev} signedIn={true} handleEdit={handleEdit}/>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default UserRevContainer