import React, {useState} from "react"

import FeederCard from "./FeederCard"
import FeederForm from "./FeederForm"

function FeedersContainer({feedersArr}) {
    console.log(feedersArr)
    const [showForm, setShowForm] = useState(false)
    
    let dispArr = [...feedersArr]
    


    return(
        <div>
            <h3>See all available feeders</h3>
            <button onClick={() => setShowForm(true)}>Add a new Feeder</button>
            {showForm ? (
                <FeederForm showForm={setShowForm}/>
            ) : (
                null
            )}
            {dispArr.map((feeder) => (
                <FeederCard feeder={feeder} key={feeder.id}/>
            ))}
        </div>
    )

}


export default FeedersContainer