import React, {useState} from "react"

function FeederSortMenu({handleSort}) {
    const [sortType, setSortType] = useState("namealpha")

    function handleSortSubmit(e) {
        e.preventDefault()
        handleSort(sortType)
    }

    return(
        <div>
            <h3>Sort Feeders By: </h3>
            <form onSubmit={handleSortSubmit}>
                <select onChange={(e) => setSortType(e.target.value)} value={sortType}>
                    <option value="namealpha">Name &#40;a-z&#41;</option>
                    <option value="namezeta">Name &#40;z-a&#41;</option>
                    <option value="neighbor">Neighborhood &#40;home, then a-z&#41;</option>
                    <option value="ratingalpha">Rating &#40;best to worst&#41;</option>
                    <option value="ratingzeta">Rating &#40;worst to best&#41;</option>
                </select>
                <button type="submit">Sort</button>
            </form>
        </div>
    )

}


export default FeederSortMenu