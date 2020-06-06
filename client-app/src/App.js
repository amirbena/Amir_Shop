import React from 'react';
import { Switch, Redirect, Route } from "react-router-dom";
import StartPage from './pages/StartPage';
import './App.css';

function App() {
  return (
    <main className="container">
      <Switch>
        <Route path="/start"><StartPage /></Route>
        <Redirect from="/" to="/start" />
      </Switch>
    </main>
  );
}

export default App;
