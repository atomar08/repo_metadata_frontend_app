import React, { Component } from "react";
import axios from 'axios';
//import Table from './Components/table';
import Spinner from 'react-bootstrap/Spinner';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';



class Tab extends Component {
  constructor () {
    super()
    this.state = {onClick:false,
      products: []

  }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 //this.handleClick = this.handleClick.bind(this);
}

buttonClick=()=>{
   const doesShow= this.state.onClick;
   this.setState({onClick: !doesShow});
    console.log("came here");

    fetch('http://127.0.0.1:4201/git/get_commits?repo_name=cs537&project_name=atomar08')
      .then(response=>response.json())
      .then(responseJson=>{
      this.setState({products:responseJson });
      })
      .catch(error=>{
          console.error(error);
      });
      }


  render() {
    return (
        <form onSubmit={this.handleSubmit}>

         <div >
         <input type="text" ref={input => this._name = input} style={{ margin:"100px auto", display:"block" }} placeholder="Enter user name" type="P" name="username" value={this.state.value} onChange={this.handleChange} required/>

        <div className='button__container'>

        <button className='button'  onClick={this.buttonClick} style={{ margin:"100px auto", display:"block" }}>Get Employees</button>
        {
            this.state.onClick ==true?

        <div className="search-results" style={{ marginTop: 10 }} >


        {this.state.products.map(obj => {
          return (
            <div>
              <h2>{obj.commit_no}</h2>
              <h3>{obj.author_name}</h3>

            </div>
          );
        })}
      
    );
    </div>:null
    }
    </div>

    </div>

    </form>
    )
}


handleChange(event) {

    this.setState({value: event.target.value});

  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
}
export default Tab;
