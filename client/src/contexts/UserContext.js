import React, {useState, useEffect} from "react"

const UserContext = React.createContext()

function UserProvider({children}) {

    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((user) => setUser(user))
          }
        })
      }, [])

    function userRevsUpdateHelper(newRevsArr) {
      let newUser = {
        ...user,
        reviews: newRevsArr,
        num_reviews: newRevsArr.length
      }
      return newUser
    }

    console.log("user", user)

    return <UserContext.Provider value={{user, setUser, userRevsUpdateHelper}}>{children}</UserContext.Provider>
}

export {UserContext, UserProvider}