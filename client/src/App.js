import React, {useState, useEffect} from "react"

import './App.css';
import Header from "./components/Header.js"
import SignupForm from './components/SignupForm';
import UserProfile from "./components/UserProfile.js"


function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])
  // console.log(user)
  
  return (
    <div className="App">
      <Header user={user}/>
      <UserProfile userDisp={user}/>
      <SignupForm setUser={setUser}/>
    </div>
  );
}

export default App;
