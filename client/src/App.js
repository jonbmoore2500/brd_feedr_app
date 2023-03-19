import React, {useState, useEffect} from "react"
import {Switch, Route} from "react-router-dom"

import './App.css';
import Header from "./components/Header.js"
import SignupForm from './components/SignupForm';
import UserProfile from "./components/UserProfile.js"
import LoginForm from "./components/LoginForm.js"
import UserRevContainer from "./components/UserRevContainer";
import FeedersContainer from "./components/FeedersContainer"

function App() {

  const [user, setUser] = useState(null)

  const [feeders, setFeeders] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
    fetch("/feeders")
    .then(r => r.json())
    .then(data => setFeeders(data))
  }, [])

  function handleUserUpdate(updatedUser) {
    setUser(updatedUser)
  }

  // function renderFeeder(newFeeder) {
  //   //const moreFeeders = [...feeders, newFeeder]
  //   //console.log('orioginal', feeders, "extra", newFeeder)
  //   setFeeders([...feeders, newFeeder])
  // }


  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      { user ? (
        <>
          <UserProfile userDisp={user} homePage={true} updateUser={handleUserUpdate}/>
          <UserRevContainer user={user}/>
          <FeedersContainer feedersArr={feeders} 
          // handleAppRender={renderFeeder}
           userID={user.id} userNeighbor={user.neighborhood}/>
        </>
        // <Switch>
        //   <Route exact path="/"> 
        //     <UserProfile userDisp={user}/>
        //   </Route>
        //   <Route path="/view_reviews">
        //     <UserRevContainer />
        //   </Route>
        //   <Route path="/find_feeder">
        //     <FeedersContainer />
        //   </Route>
        // </Switch>
        ) : (
        <>
          <SignupForm setUser={setUser}/>
          <LoginForm setUser={setUser}/>
        </> 
      )}
    </div>
  );
}

export default App;
