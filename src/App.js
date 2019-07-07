import React, { Component } from "react";
import Form from './Components/Form';
// import Footer from './Components/Footer';
//import Footer from './Components/footer';

import GoogleMapsContainer from './Components/map1';
import ReactDOM from 'react-dom';
import Tab from './Components/experiment';
import Table from './Components/table';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Dashboard from "./Components/Dashboard";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import Spinner from 'react-bootstrap/Spinner';

class App extends Component {
    componentDidMount() {
        fetch('http://127.0.0.1:8000/git/get_commits?repo_name=cs537&project_name=atomar08')
        .then(res => res.json())
        .then(json => json.products)
        .then(products => this.setState({ 'products': products }))
      }
  render() {
    return (
        <div>
    <form>
      <div className="bg">
      <HashRouter>
        <div className="bg">
          <ul className="header" style={{fontSize:'25px',width:'1000px',height:'40px', textAlign:'right', backgroundColor: 'gray'}}>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/Dashboard">dashboard</NavLink></li>
            <li><NavLink to="/map1">Map</NavLink></li>
            <li><NavLink to="/table">table</NavLink></li>
          </ul>
          <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/About" component={About}/>
            <Route path="/Dashboard" component={Dashboard}/>
            <Route path="/map1" component={GoogleMapsContainer}/>
            <Route path="/table" component={Table}/>
          </div>
           <Form/>
        </div>
      </HashRouter>
      </div>
       </form>
   </div>
    );
  }
}

export default App;
