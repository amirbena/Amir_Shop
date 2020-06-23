import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route } from "react-router-dom";
import authService from './services/authService';
import NavBar from './components/navbar';
import StartPage from './pages/StartPage';
import './App.css';



const App = () => {
  const [currUser, setCurrUser] = useState({});
  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrUser(user);
  }, [])
  const links = [
    { title: "BlueBlue", link: "/GG" }
  ]
  return (
    <div>
      <NavBar user={currUser} links={links} />
      <main className="container">
        <Switch>
             <Route path="/startPage" component={StartPage}/>
             <Redirect from="/" to="/startPage"/>
        </Switch>
      </main>

    </div>
  );
}

export default App;
