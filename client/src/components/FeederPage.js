import React, {useState, useEffect, useContext} from "react"
import { useParams } from "react-router-dom"

function FeederPage() {

    const [feeder, setFeeder] = useState(null)
    let feedParam = useParams() 

    useEffect(() => {
        fetch(`/feeders/${feedParam.feedID}`)
        .then(r => r.json())
        .then(data => setFeeder(data))
    }, [feedParam])

    console.log(feeder)
    return (
        <div>
            {feeder ? (
                <>hello</>
            ) : <h4>Loading...</h4>}
        </div>
    )
}

export default FeederPage