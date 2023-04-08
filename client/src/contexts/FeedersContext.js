import React, {useState, useEffect} from "react"

const FeedersContext = React.createContext()

function FeedersProvider({children}) {

    const [feeders, setFeeders] = useState(null)
    useEffect(() => {
        // fetch("/me").then((r) => {
        //   if (r.ok) {
        //     r.json().then((user) => setUser(user))
        //   }
        // })
        fetch("/feeders")
        .then(r => r.json())
        .then(data => setFeeders(data))
      }, [])

    return <FeedersContext.Provider value={{feeders, setFeeders}}>{children}</FeedersContext.Provider>
}

export {FeedersContext, FeedersProvider}