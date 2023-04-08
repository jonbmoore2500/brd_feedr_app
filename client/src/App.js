import React, {useState} from "react"
import {Switch, Route} from "react-router-dom"

import './App.css';
import { UserProvider } from "./contexts/UserContext";
import Header from "./components/Header.js"
import UserProfile from "./components/UserProfile.js"
import UserRevContainer from "./components/UserRevContainer";
import FeedersContainer from "./components/FeedersContainer"
import UserFormsContainer from "./components/UserFormsContainer";

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [feeders, setFeeders] = useState([])

  // useEffect(() => {
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user))
  //     }
  //   })
  //   fetch("/feeders")
  //   .then(r => r.json())
  //   .then(data => setFeeders(data))
  // }, [])

  function handleUserUpdate(newUser) {
    // let updatedUser = {
    //   ...user,
    //   neighborhood: newUser.neighborhood,
    //   fun_fact: newUser.fun_fact,
    //   password_digest: newUser.password_digest
    // }
    // setUser(updatedUser)
  }

  function handleRevEdit(updatedRev) {
    // let userRevs = user.reviews.map((rev) => {
    //   if (rev.id === updatedRev.id) {
    //     rev = updatedRev
    //     return rev 
    //   }
    //   return rev
    // })
    // let updatedUser = {
    //   ...user,
    //   reviews: userRevs
    // }
    // setUser(updatedUser)
  }

  function handleRevDelete(deleteID, updatedFeeder) {
    // let updatedUser = {
    //   ...user,
    //   reviews: user.reviews.filter(rev => rev.id !== deleteID),
    //   num_reviews: user.num_reviews - 1
    // }
    // let updatedFeeders = feeders.map((feeder) => {
    //   if (feeder.id === updatedFeeder.id) {
    //     feeder = updatedFeeder
    //     return feeder 
    //   }
    //   return feeder
    // })
    // setUser(updatedUser)
    // setFeeders(updatedFeeders)
  }

  function renderFeeder(newFeeder) {
    // const moreFeeders = [newFeeder, ...feeders]
    // setFeeders(moreFeeders)
  }

  function updateUserRevs(newRev) {
    // let updatedUser = {
    //   ...user, 
    //   reviews: [...user.reviews, newRev],
    //   num_reviews: user.num_reviews + 1
    // }
    // let updatedFeeders = feeders.map((feeder) => {
    //   if (feeder.id === newRev.feeder.id) {
    //     feeder = newRev.feeder
    //     return feeder 
    //   }
    //   return feeder
    // })
    // setUser(updatedUser)
    // setFeeders(updatedFeeders)
  }

  return (
    <div className="App">
      <UserProvider>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
        <br></br>
        { loggedIn ? (
          <Switch>
            <Route exact path="/"> 
              <UserProfile 
                homePage={true} 
                updateUser={handleUserUpdate}
              />
            </Route>
            <Route path="/view_reviews">
              <UserRevContainer 
                // reviews={user.reviews} 
                handleDelete={handleRevDelete}
                handleEdit={handleRevEdit}
              />
            </Route>
            <Route path="/find_feeder">
              <FeedersContainer 
                feedersArr={feeders} 
                // userID={user.id} 
                renderFeeder={renderFeeder}
                updateUserRevs={updateUserRevs}
              />
            </Route>
          </Switch>
          ) : (
          <UserFormsContainer setLoggedIn={setLoggedIn}/>
        )}
      </UserProvider>
    </div>
  );
}

export default App;