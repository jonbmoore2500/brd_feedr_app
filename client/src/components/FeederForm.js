import React, {useState} from "react"

function FeederForm({showForm}) {

    const [feederName, setFeederName] = useState("")
    const [feederNeighborhood, setFeederNeighborhood] = useState("")
    const [feederFreq, setFeederFreq] = useState("")
    

    function handleFeederSubmit(e) {
        e.preventDefault()
        const newFeederObj = {
            name: feederName,
            neighborhood: feederNeighborhood,
            refill_freq: feederFreq
        }
        console.log(newFeederObj)
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
                <input 
                    onChange={(e) => setFeederNeighborhood(e.target.value)} 
                    autoComplete="off"
                    value={feederNeighborhood} 
                    placeholder="Neighborhood"
                />
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
            <button onClick={() => showForm(false)}>
                Close
            </button>
        </div>
    )

}


export default FeederForm