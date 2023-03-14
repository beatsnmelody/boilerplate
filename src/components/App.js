import React, { useState, useEffect } from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Register from "./Register";
import Login from "./Login";
import Products from "./Products"
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import '../style/App.css';

// const App = () => {
//   const [APIHealth, setAPIHealth] = useState('');

//   useEffect(() => {
//     // follow this pattern inside your useEffect calls:
//     // first, create an async function that will wrap your axios service adapter
//     // invoke the adapter, await the response, and set the data
//     const getAPIStatus = async () => {
//       const { healthy } = await getAPIHealth();
//       setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
//     };

//     // second, after you've defined your getter above
//     // invoke it immediately after its declaration, inside the useEffect callback
//     getAPIStatus();
//   }, []);

  

//   return (
//     <div className="app-container">
//       <h1>Hello, World!</h1>
//       <p>API Status: {APIHealth}</p>
//     </div>
//   );
// };

const App = () => {
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false);
    } else {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, token]);
  return (
    <>
      <Router>
        <NavBar
          token={token}
          setToken={setToken}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
          <Switch>
          <Route exact path="/login"><Login
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
            </Route>
            <Route exact path="/register"><Register/></Route>
            <Route exact path="/products"><Products/></Route>
            
            {/*<Route path="/cart" element={<Cart />} /> */}
            <Route exact path="/"><Home
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
            </Route>
          </Switch>
      </Router>
    </>
  );
};



export default App;
