import React, { Component } from "react";
import Form from './Components/Form';
import Footer from './Components/Footer';

import issues from './Components/issues';
import {
  Route,
  NavLink,
  HashRouter, Switch
} from "react-router-dom";
import Home from "./Components/Home";
import Search from './Components/Search';
import {GoogleApiWrapper} from 'google-maps-react';

import GoogleMapsContainer from './Components/Map';
import Spinner from 'react-bootstrap/Spinner';

import PullRequest from './Components/PullRequest'


class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <form>
          
            <HashRouter>
              <div className="bg">
                <ul className="topnav" >
                  <li><NavLink to="/"><b>Home</b></NavLink></li>
                   <li><NavLink to="/Form"><b>Commits</b></NavLink></li>
                  <li><NavLink to="/Search"><b>Search</b></NavLink></li>
                  <li><NavLink to="/PullRequest"><b>Pull-Request</b></NavLink></li>
                 
                  <li><NavLink to="/Issues"><b>Issues</b></NavLink></li>
                  
                  <li><NavLink to="/Map"><b>Location</b></NavLink></li>
                 
                </ul>
               
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/Form" component={Form} />
                    <Route path="/Search" component={Search} />
                    <Route path="/PullRequest" component={PullRequest} />
                    <Route path="/issues" component={issues} />
                    <Route path="/Map" component={GoogleMapsContainer} />
                                     </Switch>
                </div>
                </HashRouter>
                
         
           
        </form>
        <Footer />
      </div>
    );
  }
}


export default App;
