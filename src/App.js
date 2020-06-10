import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  //  Replace Hash with BrowserRouter if server fails
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css'
import Homepage from "./components/homepage";
import Countries from "./components/countries";
import Country from "./components/countryview";
import About from "./components/about";
import Explore from "./components/explore"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/countries" component={Countries} />
          <Route exact path="/about" component={About} />
          <Route exact path="/simulation" component={Explore} />

          <Route exact path="/info/:country" component={withRouter(Country)} />
        </Switch>
      </Router >



    </div>
  );
}

export default App;
