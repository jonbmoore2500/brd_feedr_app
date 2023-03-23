import React, {useState} from "react"

function FeederForm({showForm, renderFeeder}) {

    const [feederName, setFeederName] = useState("")
    const [feederNeighborhood, setFeederNeighborhood] = useState("")
    const [feederFreq, setFeederFreq] = useState(0)
    const [errors, setErrors] = useState([])
    const neighborhoods = ["Uptown", "Edgewater", "Ravenswood", "The Loop", "Hyde Park", "Rogers Park", "Lakeview", "Kenwood", "Bronzeville"]


    function handleFeederSubmit(e) {
        e.preventDefault()
        const newFeederObj = {
            name: feederName,
            neighborhood: feederNeighborhood,
            refill_freq: parseInt(feederFreq)
        }
        fetch("/feeders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newFeederObj)
        })
        .then((r) => {
            if (r.ok) {
              r.json().then((feederData) => {
                // console.log(feederData)
                renderFeeder(feederData)
                showForm(false)
              })
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return(
        <div>
            <h2>Add a new feeder: </h2>
            <form onSubmit={handleFeederSubmit}>
                <input 
                    onChange={(e) => setFeederName(e.target.value)} 
                    autoComplete="off"
                    value={feederName} 
                    placeholder="Name"
                />
                {/* <input 
                    onChange={(e) => setFeederNeighborhood(e.target.value)}                     
                    autoComplete="off"
                    value={feederNeighborhood} 
                    placeholder="Neighborhood"
                /> */}
                <select onChange={(e) => setFeederNeighborhood(e.target.value)}>
                    {neighborhoods.map((neighbor) => (
                        <option key={neighbor} value={neighbor}>{neighbor}</option>
                    ))}
                </select>
                <input 
                    onChange={(e) => setFeederFreq(e.target.value)} 
                    autoComplete="off"
                    value={feederFreq} 
                    placeholder="Refill Frequency"
                />
                <button type="submit">
                    Save this feeder?
                </button>
            </form>
            { errors.length > 0 ? (
                errors.map((err) => (
                    <h4 key={err.index}>{err}</h4>
                ))
            ) : (
                null
            )}
            <button onClick={() => showForm(false)}>
                Close
            </button>
        </div>
    )

}


export default FeederForm