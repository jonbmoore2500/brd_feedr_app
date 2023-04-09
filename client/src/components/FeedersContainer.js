import React, {useState, useContext} from "react"
import {Card, Container} from "semantic-ui-react"

import { UserContext } from "../contexts/UserContext.js"
import { FeedersContext } from "../contexts/FeedersContext.js"
import FeederCard from "./FeederCard"
import FeederForm from "./FeederForm"
import FeederSortMenu from "./FeederSortMenu"

function FeedersContainer() {
    
    const {feeders, setFeeders} = useContext(FeedersContext)
    const {user} = useContext(UserContext)
    console.log(feeders, "feeders")

    const [showForm, setShowForm] = useState(false)
    const [sortType, setSortType] = useState("namealpha")

    function handleSortChange(newSort) {
        setSortType(newSort)
    }

    function helperSort(array, direction, sortField) {
        let sorted = array.sort(function (a, b) {
            if (a[sortField] < b[sortField]) {return -1 * direction} 
            if (a[sortField] > b[sortField]) {return direction}
            return 0})
        return sorted
    }

    function handleSort(sortType) {
        if (sortType === "namealpha") {
            // alphabetical a-z
            return helperSort(feeders, 1, "name")
        } else if (sortType === "namezeta") {
            // alphabetical z-a
            return helperSort(feeders, -1, "name")
        } else if (sortType === "neighbor") {
            // home neighborhood, then other neighborhoods alphabetically
            let homeFeeders = feeders.filter(feeder => feeder.neighborhood === user.neighborhood)
            let otherFeeders = helperSort(feeders.filter(feeder => feeder.neighborhood !== user.neighborhood), 1, "neighborhood")
            return [...homeFeeders, ...otherFeeders]
        } else if (sortType === "ratingzeta") {
            // rating high to low
            return helperSort(feeders, 1, "average_rating")
        } else {
            // rating low to high
            return helperSort(feeders, -1, "average_rating")
        } 
    }

    const dispArr = handleSort(sortType)

    if (feeders && user) {return(
        <div id="feeders-container">
            <h1>See all available feeders</h1>
            <button onClick={() => setShowForm(true)}>Add a new Feeder</button>
            {showForm ? (
                <FeederForm showForm={setShowForm} />
            ) : (
                null
            )}
            <FeederSortMenu currentSort={sortType} handleSort={handleSortChange}/>
            <Container>
                <Card.Group itemsPerRow={3}>
                    {dispArr.map((feeder) => (
                        <FeederCard 
                            key={feeder.id} 
                            feeder={feeder} 
                        />
                    ))}
                </Card.Group>
            </Container>
        </div>
    )} else {
        return <h3>loading</h3>
    }
}

export default FeedersContainer