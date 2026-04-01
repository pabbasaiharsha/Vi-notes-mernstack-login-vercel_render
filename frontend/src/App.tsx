import {lazy, Suspense} from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from './assets/notepad-logo.jpg';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
const Login =lazy(()=> import("./components/login")) 
const Register =lazy(()=> import("./components/register")) 
function App(){
return(
    <Router>


   <nav>
  <img src={logo} alt="logo" />
  <div id="heading">Vi-notes</div>

  <div>
  <Link  to="/register">Register</Link>
  <Link to="/login">Login</Link>
 
  </div>
</nav>

<Routes>
   <Route
  path="/"
  element={ <ErrorBoundary><Suspense fallback={<h2 style={{ color: "white", textAlign: "center" , padding:"20px"}}>Loading...</h2>}><Login/></Suspense></ErrorBoundary> }
  />
  <Route
  path="/login"
  element={ <ErrorBoundary><Suspense fallback={<h2 style={{ color: "white", textAlign: "center", padding:"20px" }}>Loading...</h2>}><Login/></Suspense></ErrorBoundary> }
  />
  <Route
    path="/register"
  element={ <ErrorBoundary><Suspense fallback={<h2 style={{ color: "white", textAlign: "center",padding:"20px" }}>Loading...</h2>}><Register/></Suspense></ErrorBoundary>}
  />

</Routes>
  </Router>
)
}


export default App;
