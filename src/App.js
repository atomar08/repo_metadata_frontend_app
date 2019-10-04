import React, { Component } from "react";
import Form from './Components/Form';
import Footer from './Components/Footer';
import GoogleMapsContainer from './Components/map1';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./Components/Home";
// import search from "./Components/search";
import Dashboard from "./Components/Dashboard";
//import BarChart from './Components/BarChart';


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
          <div className="bg">
            <HashRouter>
              <div className="bg">
                <ul className="header" style={{ fontSize: '15px',  width: '1060px', height: '45px', textAlign: 'right', backgroundColor: 'green' }}>
                  <li><NavLink to="/">Home</NavLink></li>
                   <li><NavLink to="/">search</NavLink></li>
                  <li><NavLink to="/Dashboard">Dashboard</NavLink></li>
                 // <li><NavLink to="/map1">Map</NavLink></li>

                </ul>

                <Form />

                <div className="bg">
                  <Route path="/Form" component={Home} />
                  {/* <Route path="/search" component={search} /> */}
                  <Route path="/Dashboard" component={Dashboard} />
                  <Route path="/map1" component={GoogleMapsContainer} />

                </div>
              </div>

            </HashRouter>
          </div>
          <Footer/>

        </form>

      </div>
    );
  }
}
// componentDidMount() {
  //     fetch('http://127.0.0.1:8000/git/get_commits?repo_name=cs537&project_name=atomar08')
  //     .then(res => res.json())
  //     .then(json => json.products)
  //     .then(products => this.setState({ 'products': products }))
  //   }

export default App;
