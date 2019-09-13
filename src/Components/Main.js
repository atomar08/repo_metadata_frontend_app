import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from ".Components/Home";
import About from ".Components/About";
import Dashboard from ".Components/Dashboard";

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <h1>Simple SPA</h1>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
            <li><NavLink to="/Dashboard">dashboard</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/" component={Home} />
            <Route path="/About" component={Stuff} />
            <Route path="/Dashboard" component={Contact} />
          </div>
        </div>
      </HashRouter>
    );
  }
}
export default App;
