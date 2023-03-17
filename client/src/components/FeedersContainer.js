import React from "react"

import FeederCard from "./FeederCard"

function FeedersContainer({feedersArr}) {
    console.log(feedersArr)
    let dispArr = [...feedersArr]
    
    return(
        <div>
            <h3>See all available feeders</h3>
            {dispArr.map((feeder) => (
                <FeederCard feeder={feeder}/>
            ))}
        </div>
    )

}


export default FeedersContainer