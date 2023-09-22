import React, {useContext} from "react"
import {Switch, Route} from "react-router-dom"

import './App.css';
import { UserContext } from "./contexts/UserContext";
import { FeedersContext } from "./contexts/FeedersContext";
import Header from "./components/Header.js"
import UserProfile from "./components/UserProfile.js"
import UserRevContainer from "./components/UserRevContainer";
import FeedersContainer from "./components/FeedersContainer"
import UserFormsContainer from "./components/UserFormsContainer";
import FeederPage from "./components/FeederPage";

function App() {

  const {user} = useContext(UserContext)
  const {feeders} = useContext(FeedersContext)

  return (
    <div className="App">
        <Header/>
        <br></br>
        { user && feeders ? (
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
            <Route path="/feeders/:feedID" >
              <FeederPage />
            </Route>
          </Switch>
          ) : (
          <UserFormsContainer/>
        )}
    </div>
  );
}

export default App;