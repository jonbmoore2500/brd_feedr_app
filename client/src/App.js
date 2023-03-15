//import logo from './logo.svg';
import React, {useState, useEffect} from "react"

import './App.css';
import Header from "./components/Header.js"
import SignupForm from './components/SignupForm';
import UserProfile from "./components/UserProfile.js"


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    console.log("hello useeffect")
  }, [])
  
  
  return (
    <div className="App">
      <Header />
      <UserProfile userDisp={user}/>
      <SignupForm setUser={setUser}/>
    </div>
  );
}

export default App;
