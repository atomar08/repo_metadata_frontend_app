//Doc: https://www.digitalocean.com/community/tutorials/how-to-display-data-from-the-digitalocean-api-with-react
import React, { Component } from "react";
import axios from 'axios';
//import Table from './Components/table';
import Spinner from 'react-bootstrap/Spinner';
import filterFactory,{textFilter} from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import BootstrapTable from 'react-bootstrap-table-next';

//const RenderRow = (props) =>{
// return props.keys.
//map((key, index)=>{
// return <td key={props.data[key]}>{props.data[key]}</td>
// })
//}

class Form extends Component {
  constructor () {
    super()
    this.state = {
        onClick:false,
        metadata: [],
  }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
 //this.handleClick = this.handleClick.bind(this);
}

//getKeys = function(){
// return
//Object.keys(this.props.data[0]); }
//
//getHeader = function(){
// var keys = this.getKeys();
// return
//keys.map((key, index)=>{
// return <th key={key}>{key.toUpperCase()}</th>
// })
// }
//
//getRowsData = function(){
// var items = this.props.data;
// var keys = this.getKeys();
// return items.
//map((row, index)=>{
// return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
// })
// }

    // if (this.state.value!=null) {
buttonClick=()=>{
    const doesShow= this.state.onClick;
    this.setState({onClick: !doesShow});
    console.log("came here");
    fetch('http://127.0.0.1:8000/git/get_commits?repo_name=cs537&project_name=atomar08')
    .then(results => results.json())
    .then(data => this.setState({ metadata: data.metadata }))
    .then(results => console.log(results));
}
render () {
    // let data;
    // if (this.state.loading) {
    //   data = <img  data-src={ require('../images/giphy.gif') } />
    // }
    // else{
return (
<form onSubmit={this.handleSubmit}>
 <div >
 <input type="text" ref={input => this._name = input} style={{ margin:"100px auto", display:"block" }} placeholder="Enter user name" type="P" name="username" value={this.state.value} onChange={this.handleChange} required/>
<div className='button__container'>
<button className='button'  onClick={this.buttonClick} style={{ margin:"100px auto", display:"block" }}>Get Employees</button>
{
    this.state.onClick ==true?
    <div className="search-results" style={{ marginTop: 10 }} >
    <div>
        <table class="table table-bordered table-hover table-striped">
          <thead>
            <tr class="bg-gray text-white">
              <th>Commit No</th>
              <th>Commit Id</th>
              <th>Commit Date</th>
              <th>Commit Message</th>
              <th>Files Changed</th>
              <th>Author Name</th>
              <th>Repository Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.metadata.map(commit => (
              <tr>
                <td scope="row">{commit.commit_no}</td>
                <td>{commit.commit_id}</td>
                <td>{commit.commit_date}</td>
                <td>{commit.commit_message}</td>
                <td>{commit.files}</td>
                <td>{commit.author_name}</td>
                <td>{commit.repo_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
</div>:null
}
</div>
</div>
</form>
)}

handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
}

export default Form;
