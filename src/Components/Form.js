//Doc: https://www.digitalocean.com/community/tutorials/how-to-display-data-from-the-digitalocean-api-with-react
import React, { Component } from "react";
import axios from 'axios';
//import Table from './Components/table';
import Spinner from 'react-bootstrap/Spinner';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import pagination from 'react-js-pagination';
import BootstrapTable from 'react-bootstrap-table-next';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      onClick: false,
      data: null,
      serverdata: [],
      metadata: [],
      repo_name: '',
      project_name: '',
      RepoError:'',
      projectError:'',
      valid:"repository is valid",
      current_page_number: -1,
      total_number_of_pages: '',
      total_number_of_commits: '',
      has_next_page: false,
      has_previous_page: false,
      // activePage: 15
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  validate_repository = () => {
    const doesShow = this.state.onClick;
    this.setState({ onClick: !doesShow });
    console.log("in button click");
    fetch('http://127.0.0.1:8000/git/validate_repository?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name)

  }

  buttonClick = () => {
    const doesShow = this.state.onClick;
    this.setState({ onClick: !doesShow });
    console.log("in button click");
    //fetch('http://127.0.0.1:8000/git/validate_repository?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name)
    fetch('http://127.0.0.1:8000/git/read_commits_page?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name)
      .then(results => results.json())
      .then(data => this.setState({
        serverdata: data.metadata,
        current_page_number: data.current_page_number,
        has_next_page: data.has_next_page,
        has_previous_page: data.has_previous_page
      }))
      .then(body => console.log(body));
  }

  buttonPrevious = () => {
    // Anjali
    // <button className='button'  onClick={this.buttonPrevious} style={{ margin:"2px auto", display:"block" }} disabled={!this.state.page_number}>previous</button><button className='button'  onClick={this.buttonNext} style={{ margin:"2px auto", display:"block" }}>Next</button>
    console.log("in Previous button" + this.state.repo_name + " " + this.state.project_name + " current page number: " + this.state.current_page_number)
    let prev_page_no = this.state.current_page_number;
    prev_page_no--
    console.log("previous page number: " + prev_page_no)
    fetch('http://127.0.0.1:8000/git/read_commits_page?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name + '&page_number=' + prev_page_no)
      .then(results => results.json())
      .then(data => this.setState({
        serverdata: data.metadata,
        current_page_number: data.current_page_number,
        has_next_page: data.has_next_page,
        has_previous_page: data.has_previous_page
      }))
      .then(results => console.log(results))
    console.log("done buttonPrevious")
  }

  buttonNext = () => {
    console.log("in next button " + this.state.repo_name + " " + this.state.project_name + " current page number: " + this.state.current_page_number)
    let next_page_no = this.state.current_page_number;
    next_page_no++
    console.log("next page number: " + next_page_no)
    fetch('http://127.0.0.1:8000/git/read_commits_page?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name + '&page_number=' + next_page_no)
      .then(results => results.json())
      .then(data => this.setState({
        serverdata: data.metadata,
        current_page_number: data.current_page_number,
        has_next_page: data.has_next_page,
        has_previous_page: data.has_previous_page
      }))
      .then(results => console.log(results))
    console.log("done buttonNext: ")
  }


  // render () {
  //
  // return (
  // <form onSubmit={this.handleSubmit}>
  //  <div >
  //
  //  <input type="text" ref={input => this.reponame = input}
  //  style={{ margin:"100px auto", display:"block" }} placeholder="Enter repo name" name="reponame"
  //  value={this.state.repo_name}   onChange={this.handleChange} errorMessage="Email is invalid"
  //           emptyMessage="Email is required" required/>


  render() {
    let buttonPrevious, buttonNext;
    const { serverdata, has_next_page, has_previous_page } = this.state;
    console.log("in render has_next_page: ", has_next_page)
    console.log("in render has_previous_page: ", has_previous_page)

    if (has_previous_page) {
      buttonPrevious = <button className='button' onClick={this.buttonPrevious} style={{ margin: "2px auto", display: "block" }}>Previous</button>
    }

    if (has_next_page) {
      buttonNext = <button className='button' onClick={this.buttonNext} style={{ margin: "2px auto", display: "block" }}>Next</button>
    }

    console.log("going to call return")
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="container">
        
         
          <center> <span><input type="text" ref={input => this.reponame = input} placeholder='Enter repo name' name="reponame" value={this.state.repo_name} onChange={this.handleChange} errorMessage="Email is invalid"
            emptyMessage="Email is required" required />
          <input type="text" ref={input => this.name = input}  placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1} /></span></center> 
          <center><span><button class='btn' onClick={this.validate_repository}> validate_repository </button> </span></center>
            
          </div>
        {/* <div >
          <input type="text" ref={input => this.reponame = input}
            style={{ margin: "100px auto", display: "block" }} placeholder="Enter repo name" name="reponame"
            value={this.state.repo_name} onChange={this.handleChange} />?(<div style={{fontsize:12,color:"red"}}>{this.state.valid}</div>):null}
          </div><div>
          <input type="text" ref={input => this.name = input} style={{ margin: "100px auto", display: "block" }}
            placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1} errorMessage="Email is invalid"
            emptyMessage="Email is required" required /></div>

          <div className='button__container'>
          <button className='button' onClick={this.validate_repository} style={{ margin: "100px auto", display: "block" }}>validate_repository</button>
          {
              this.state.onClick == true ?(<div style={{fontsize:12,color:"red"}}>{this.state.repo_name}</div>):null} */}
          <div className='button__container'>
            <button className='button' onClick={this.buttonClick} >Get data</button>
          
            {
              this.state.onClick == true ?
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
                        {this.state.serverdata.map(commit => (
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
                  {buttonPrevious}
                  {buttonNext}
                  {/* <button className='button' onClick={this.buttonPrevious} style={{ margin: "2px auto", display: "block" }}>Previous</button> */}
                  {/* <button className='button' onClick={this.buttonNext} style={{ margin: "2px auto", display: "block" }}>Next</button> */}
                </div> : null
            }
           </div> 
       

      </form>
    )
  }

  handleChange(event) {
    this.setState({ repo_name: event.target.value });
    //    this.setState({ [event.target.name]: event.target.value });
  }

  handleChange1(event) {
    this.setState({ project_name: event.target.value });
  }

  handleSubmit(event) {
    console.log("in handleSubmit event")
     alert('Repository name ' + this.state.repo_name + ' and project name ' + this.state.project_name + ' submitted.');
    event.preventDefault();
  }
}

export default Form;
