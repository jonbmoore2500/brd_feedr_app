import React, {useState} from "react"
import {Card, Container} from "semantic-ui-react"

import FeederCard from "./FeederCard"
import FeederForm from "./FeederForm"
import FeederSortMenu from "./FeederSortMenu"

function FeedersContainer({feedersArr, userID, userNeighbor, renderFeeder, updateUserRevs}) {
    
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
            return helperSort(feedersArr, 1, "name")
        } else if (sortType === "namezeta") {
            // alphabetical z-a
            return helperSort(feedersArr, -1, "name")
        } else if (sortType === "neighbor") {
            // home neighborhood, then other neighborhoods alphabetically
            let homeFeeders = feedersArr.filter(feeder => feeder.neighborhood === userNeighbor)
            let otherFeeders = helperSort(feedersArr.filter(feeder => feeder.neighborhood !== userNeighbor), 1, "neighborhood")
            return [...homeFeeders, ...otherFeeders]
        } else if (sortType === "ratingzeta") {
            // rating high to low
            return helperSort(feedersArr, 1, "average_rating")
        } else {
            // rating low to high
            return helperSort(feedersArr, -1, "average_rating")
        } 
    }

    const dispArr = handleSort(sortType)

    return(
        <div>
            <h3>See all available feeders</h3>
            <button onClick={() => setShowForm(true)}>Add a new Feeder</button>
            {showForm ? (
                <FeederForm showForm={setShowForm} renderFeeder={renderFeeder}/>
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
                                userID={userID} 
                                updateUserRevs={updateUserRevs}
                            />
                    ))}
                </Card.Group>
            </Container>
        </div>
    )

}


export default FeedersContainer