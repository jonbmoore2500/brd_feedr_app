import React, {useContext} from "react"
import {Switch, Route} from "react-router-dom"

import './App.css';
import { UserContext } from "./contexts/UserContext";
import Header from "./components/Header.js"
import UserProfile from "./components/UserProfile.js"
import UserRevContainer from "./components/UserRevContainer";
import FeedersContainer from "./components/FeedersContainer"
import UserFormsContainer from "./components/UserFormsContainer";

function App() {

  const {user} = useContext(UserContext)







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
        <Header/>
        <br></br>
        { user ? (
          <Switch>
            <Route exact path="/"> 
              <UserProfile 
                homePage={true} 
              />
            </Route>
            <Route path="/view_reviews">
              <UserRevContainer />
            </Route>
            <Route path="/find_feeder">
              <FeedersContainer />
            </Route>
          </Switch>
          ) : (
          <UserFormsContainer/>
        )}
    </div>
  );
}

export default App;