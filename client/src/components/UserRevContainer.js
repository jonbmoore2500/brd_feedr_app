import React from "react"

import UserProfile from "./UserProfile"
import ReviewCard from "./ReviewCard"

function UserRevContainer({user}) {
console.log(user)

    return(

        <div>
            <h3>Your Reviews: </h3>
            
            <div className="left_div">
                <UserProfile userDisp={user}/>
            </div>
            <div>
                {user.reviews.map((rev) => (
                    <ReviewCard key={rev.id} review={rev} signedIn={true}/>
                ))}
            </div>
        </div>
    )

}

export default UserRevContainer