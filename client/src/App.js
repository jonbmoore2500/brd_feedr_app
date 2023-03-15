//import logo from './logo.svg';
import './App.css';
import Header from "./components/Header.js"
import SignupForm from './components/SignupForm';
import UserProfile from "./components/UserProfile.js"

function App() {
  return (
    <div className="App">
      <Header />
      {/* <UserProfile /> */}
      <SignupForm />
    </div>
  );
}

export default App;
