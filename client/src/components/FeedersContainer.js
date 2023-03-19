import React, {useState} from "react"

import FeederCard from "./FeederCard"
import FeederForm from "./FeederForm"
import FeederSortMenu from "./FeederSortMenu"

function FeedersContainer({feedersArr, userID, userNeighbor}) {
    console.log(feedersArr)
    const [showForm, setShowForm] = useState(false)
    const [dispArr, setDispArr] = useState(feedersArr)

    function handleSort(sortType) {
        //console.log(sortType, dispArr[0])
        let newFeeders = [...feedersArr]
        // could be wildly streamlined, example namezeta could use same filter but reverses after
        if (sortType == "namealpha") {
            newFeeders = newFeeders.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            } 
            if (a.name > b.name) {
                return 1;
            }
            return 0;
            })
        } else if (sortType == "namezeta") {
            newFeeders = newFeeders.sort(function (a, b) {
            if (a.name < b.name) {
                return 1;
            } 
            if (a.name > b.name) {
                return -1;
            }
            return 0;
            })
        } else if (sortType == "neighbor") {
            newFeeders = newFeeders.sort(function (a, b) {
            if (a.neighborhood < b.neighborhood) {
                return -1;
            } 
            if (a.neighborhood > b.neighborhood) {
                return 1;
            }
            return 0;
            })
            // sorts alphabetically by neighborhood, want userNeighbor first
        } 
        // else if (sortType == "ratingalpha") {
        //     newFeeders = newFeeders.sort(function (a, b) {
        //         return a.rating - b.rating
        //     })
        // } else {
        //     newFeeders = newFeeders.sort(function (a, b) {
        //         return b.rating - a.rating
        //     })
        // } need to add average rating method
        setDispArr(newFeeders)
      // how to do with switch statement? couldn't get to work
    }
    
    return(
        <div>
            <h3>See all available feeders</h3>
            <button onClick={() => setShowForm(true)}>Add a new Feeder</button>
            <FeederSortMenu handleSort ={handleSort}/>
            {showForm ? (
                <FeederForm showForm={setShowForm}/>
            ) : (
                null
            )}
            {dispArr.map((feeder) => (
                <FeederCard feeder={feeder} key={feeder.id} userID={userID}/>
            ))}
        </div>
    )

}


export default FeedersContainer