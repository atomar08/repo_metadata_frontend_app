import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBMask, MDBRow,
MDBCol, MDBIcon,
MDBBtn, MDBView, MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBFormInline
} from "mdbreact";
import "./index.css";

class ClassicFormPage extends React.Component {
  state = {
    collapseID: ""
  };

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  render() {
    const overlay = (
      <div id="sidenav-overlay" style={{ backgroundColor: "transparent" }} onClick={this.toggleCollapse("navbarCollapse")} />
    );
    return (
    <div id="classicformpage">




                    <h3 className="button">
                      <MDBIcon icon="user" /> Register:
                    </h3>
                    <hr className="hr-light" />
                    <MDBInput label="Your name" icon="user" />
                    <MDBInput label="Your email" icon="envelope" />
                    <MDBInput label="Your password" icon="lock" type="password" />
                    <div className="text-center mt-4 black-text">
                      <MDBBtn color="indigo">Sign Up</MDBBtn>
                      <hr className="hr-light" />

                    </div>


    </div>
    );
  }
}

export default ClassicFormPage;


import React, { Component } from "react";
import Form from './Components/Form';
import Footer from './Components/footer';


import GoogleMapsContainer from './Components/map1';
import ReactDOM from 'react-dom';
import Login from './Components/experiment';
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

  render() {

    return (
    <form>

      <div className="bg">
      <HashRouter>
        <div className="bg">

          <h1 center>Welcome to the GITMetadata</h1>

          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/About">About</NavLink></li>
            <li><NavLink to="/Dashboard">dashboard</NavLink></li>
            <li><NavLink to="/map1">Map</NavLink></li>
            <li><NavLink to="/experiment">Map1</NavLink></li>

          </ul>
          <div className="content">
            <Route path="/" component={Home}/>
            <Route path="/About" component={About}/>
            <Route path="/Dashboard" component={Dashboard}/>
            <Route path="/map1" component={GoogleMapsContainer}/>
            <Route path="/experiment" component={Login}/>
          </div>
        </div>
      </HashRouter>
      <div>
 <Form/>


       </div>

       <div>
       <Footer/>
       </div>
       </div>

       </form>

    );

  }
}

export default App;
