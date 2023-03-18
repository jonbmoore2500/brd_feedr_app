import React from "react"

function FeederCard({feeder}) {

    return(
        <div>
            <h2>{feeder.name}</h2>
            <h4>Neighborhood: {feeder.neighborhood}</h4>
            <h4>Refilled every {feeder.refill_freq} days</h4>
            <h4>Average rating: ****</h4>
            <h4>Number of reviews: ****</h4>
        </div>
    )

}


export default FeederCard