import React, {useState, useContext} from "react"
import {Card, Container} from "semantic-ui-react"

import { UserContext } from "../contexts/UserContext.js"
import { FeedersContext } from "../contexts/FeedersContext.js"
import FeederCard from "./FeederCard"
import FeederForm from "./FeederForm"
import FeederSortMenu from "./FeederSortMenu"

function FeedersContainer() {
    
    const {feeders, sortFeeders} = useContext(FeedersContext)
    const {user} = useContext(UserContext)

    const [showForm, setShowForm] = useState(false)
    const [sortType, setSortType] = useState("namealpha")

    function handleSort(sortType) {
        if (sortType === "namealpha") {
            // alphabetical a-z
            return sortFeeders(1, "name")
        } else if (sortType === "namezeta") {
            // alphabetical z-a
            return sortFeeders(-1, "name")
        } else if (sortType === "neighbor") {
            // home neighborhood, then other neighborhoods alphabetically
            let homeFeeders = feeders.filter(feeder => feeder.neighborhood === user.neighborhood)
            let otherFeeders = sortFeeders(1, "neighborhood", user.neighborhood)
            return [...homeFeeders, ...otherFeeders]
        } else if (sortType === "ratingzeta") {
            // rating high to low
            return sortFeeders(1, "average_rating")
        } else {
            // rating low to high
            return sortFeeders(-1, "average_rating")
        } 
    }

    const dispArr = handleSort(sortType)

    return(
        <div id="feeders-container">
            <h1>See all available feeders</h1>
            <button onClick={() => setShowForm(true)}>Add a new Feeder</button>
            {showForm ? (
                <FeederForm showForm={setShowForm} />
            ) : (
                null
            )}
            <FeederSortMenu currentSort={sortType} handleSort={setSortType}/>
            <Container>
                <Card.Group itemsPerRow={3}>
                    {dispArr.map((feeder) => (
                        <FeederCard 
                            key={feeder.id} 
                            feeder={feeder} 
                            userID={user.id}
                        />
                    ))}
                </Card.Group>
            </Container>
        </div>
    )
}

export default FeedersContainer