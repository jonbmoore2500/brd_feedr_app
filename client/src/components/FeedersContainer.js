import React, {useState} from "react"
import {Card, Container} from "semantic-ui-react"

import FeederCard from "./FeederCard"
import FeederForm from "./FeederForm"
import FeederSortMenu from "./FeederSortMenu"

function FeedersContainer({feedersArr, userID, userNeighbor, renderFeederApp, updateUserRevs}) {
    
    const [showForm, setShowForm] = useState(false)
    const [sortType, setSortType] = useState("namealpha")
    // const [newestFeeder, setNewestFeeder] = useState({})

    function handleSortChange(newSort) {
        setSortType(newSort)
    }

    function renderFeeder(newFeeder) {
        // setNewestFeeder(newFeeder)
        renderFeederApp(newFeeder)
    }

    function handleSort(sortType) {
        let newFeeders = [...feedersArr]
        if (sortType === "namealpha") {
            // alphabetical a-z
            newFeeders = newFeeders.sort(function (a, b) {
            if (a.name < b.name) {return -1} 
            if (a.name > b.name) {return 1}
            return 0})
        } else if (sortType === "namezeta") {
            // alphabetical z-a
            newFeeders = newFeeders.sort(function (a, b) {
            if (a.name < b.name) {return 1} 
            if (a.name > b.name) {return -1}
            return 0})
        } else if (sortType === "neighbor") {
            // home neighborhood, then neighborhoods alphabetically
            let homeFeeders = newFeeders.filter(feeder => feeder.neighborhood === userNeighbor)
            let otherFeeders = newFeeders.filter(feeder => feeder.neighborhood !== userNeighbor)
            newFeeders = [...homeFeeders, ...otherFeeders.sort(function (a, b) {
                if (a.neighborhood < b.neighborhood) {return -1}
                if (a.neighborhood > b.neighborhood) {return 1}
                return 0})]
        } else if (sortType === "ratingzeta") {
            // rating high to low
            newFeeders = newFeeders.sort(function (a, b) {
                return (a.average_rating - b.average_rating)
            })
        } else {
            // rating low to high
            newFeeders = newFeeders.sort(function (a, b) {
                return (b.average_rating - a.average_rating)
            })
        } 
        // if (newestFeeder.hasOwnProperty('name')) {
        //     console.log("passes test")
        //     newFeeders = [newestFeeder, ...newFeeders]
        //     // setNewestFeeder({})
        // } would like to have new feeder appear at top of list after creation, then be included normally after the first re-sort
        // keep newest feeder in state, if exists move feeder with that id to top. reset newest feeder state to empty upon re-sort?
        return newFeeders
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
                            <FeederCard key={feeder.id} feeder={feeder} userID={userID} updateUserRevs={updateUserRevs}/>
                    ))}
                </Card.Group>
            </Container>
        </div>
    )

}


export default FeedersContainer