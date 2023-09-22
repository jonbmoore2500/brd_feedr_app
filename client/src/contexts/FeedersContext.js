import React, {useState, useEffect} from "react"

const FeedersContext = React.createContext()

function FeedersProvider({children}) {

    const [feeders, setFeeders] = useState(null)
    useEffect(() => {
        fetch("/feeders")
        .then(r => r.json())
        .then(data => setFeeders(data))
      }, [])

    function findFeeder(id) {
      return feeders.find((feeder) => id === feeder.id)
    }

    function feedersUpdateHelper(newRevs, feederID) {
      let newFeedersArr = feeders.map((feeder) => {
          if (feeder.id === feederID) {
            let newFeeder = {...feeder}
            newFeeder.reviews = newRevs
            newFeeder.num_reviews = newRevs.length
            newFeeder.average_rating = +(newRevs.map(rev => rev.rating).reduce((a,b) => a+b, 0)/(newRevs.length)).toFixed(2)
            return newFeeder
          } else {
            return feeder
          }
        })        
        return newFeedersArr
    }

    function sortFeeders(direction, sortField, userNeighborhood) {
      let feedersToSort = [...feeders]
      if (sortField === "neighborhood") {
        feedersToSort = feedersToSort.filter(feeder => feeder.neighborhood !== userNeighborhood)
      }
      return feedersToSort.sort(function (a, b) {
        if (a[sortField] < b[sortField]) {return -1 * direction} 
        if (a[sortField] > b[sortField]) {return direction}
        return 0})
    }

    console.log("feeders", feeders)

  return <FeedersContext.Provider value={{feeders, setFeeders, findFeeder, feedersUpdateHelper, sortFeeders}}>{children}</FeedersContext.Provider>
}


export {FeedersContext, FeedersProvider}