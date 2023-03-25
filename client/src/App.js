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

  function handleUserUpdate(newUser) {
    let updatedUser = {
      ...user,
      neighborhood: newUser.neighborhood,
      fun_fact: newUser.fun_fact,
      password_digest: newUser.password_digest
    }
    setUser(updatedUser)
  }

  function handleRevEdit(updatedRev) {
    let userRevs = user.reviews.map((rev) => {
      if (rev.id === updatedRev.id) {
        rev = updatedRev
        return rev 
      }
      return rev
    })
    let updatedUser = {
      ...user,
      reviews: userRevs
    }
    setUser(updatedUser)
  }

  function handleRevDelete(deleteID) {
    let userRevs = user.reviews.filter(rev => rev.id !== deleteID)
    let userNumRevs = user.num_reviews - 1
    let updatedUser = {
      ...user,
      reviews: userRevs,
      num_reviews: userNumRevs
    }
    setUser(updatedUser)
  }

  function renderFeeder(newFeeder) {
    const moreFeeders = [newFeeder, ...feeders]
    setFeeders(moreFeeders)
  }

  function updateUserRevs(newRev) {
    let updatedUser = {
      ...user, 
      reviews: [...user.reviews, newRev]
    }
    let updatedFeeders = feeders.map((feeder) => {
      if (feeder.id === newRev.feeder.id) {
        feeder = newRev.feeder
        return feeder 
      }
      return feeder
    })
    setUser(updatedUser)
    setFeeders(updatedFeeders)
  }


  return (
    <div className="App">
      <Header user={user} setUser={setUser}/>
      { user ? (
        <Switch>
          <Route exact path="/"> 
            <UserProfile 
              userDisp={user} 
              homePage={true} 
              updateUser={handleUserUpdate}
            />
          </Route>
          <Route path="/view_reviews">
            <UserRevContainer 
              user={user} 
              handleDelete={handleRevDelete}
              handleEdit={handleRevEdit}
            />
          </Route>
          <Route path="/find_feeder">
            <FeedersContainer 
              feedersArr={feeders} 
              userID={user.id} 
              userNeighbor={user.neighborhood} 
              renderFeederApp={renderFeeder}
              updateUserRevs={updateUserRevs}
            />
          </Route>
        </Switch>
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
