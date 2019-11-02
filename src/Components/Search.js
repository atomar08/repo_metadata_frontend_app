import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
const port = 8000;
class Search extends Component {
  constructor() {
    super()
    this.state = {
      repo_name: '',
      project_name: '',
      serverdata: [],
      commit_id: '',
    };

    // Binding Event Handler: binding is required for all methods which uses const values
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="container">

          <center> <span><input type="text" ref={input => this.reponame = input} placeholder='Enter repo name' name="reponame" value={this.state.repo_name} onChange={this.handleChange}
            emptyMessage="Email is required" required />
            <input type="text" ref={input => this.name = input} placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1}
              emptyMessage="Email is required" required /></span></center><br></br>

          <center><input type="text" ref={input => this.commit_id = input} placeholder='Enter commit id' name="id" value={this.state.commit_id} onChange={this.handleChange2}
            emptyMessage="Email is required" required /><span></span></center>
          {/* <input type="text" ref={input => this.name = input} placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1} errorMessage="Email is invalid"
              emptyMessage="Email is required" required /></center> */}
        </div>
        <div className='button__container'>
          <center><span><button class='btn' onClick={this.search_data}> Search </button> </span></center>
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
              </div> : null
          }
        </div>
      </form>
    )
  }

  validate_repository = () => {
    console.log("in validate repository: ", this.state.validated);
    fetch('http://127.0.0.1:8001/git/validate_repository?repo_name=' + this.state.repo_name + '&project_name=' +
      this.state.project_name)
      // .then(response => response.text())
      // .then(data => this.setState({
      //   valid_message: data
      // }))
      // .then(body => console.log("validate completed: ", this.state.valid_message));
      // =====or=====
      .then(response => {
        if (response.status == 200) {
          alert('valid repository')
          this.setState({
            validated: true,
            onClick: false
          })
        } else if (response.status == 404) {
          alert('invalid repository')
          this.setState({
            validated: false,
            onClick: false,
            repo_name: "",
            project_name: ""
          })
        }
      })
      .then(body => console.log("validate completed: ", this.state.validated));
  }

  search_data = () => {
    if (this.state.repo_name != null && this.state.project_name != null && this.state.commit_id != null) {
      this.setState({ onClick: true })
      console.log("in button click and repo is already validated");
      fetch('http://127.0.0.1:8001/git/get_commits_id?repo_name=' + this.state.repo_name +
        '&project_name=' + this.state.project_name + '&commit_id=' + this.state.commit_id)
        .then(results => results.json())
        .then(data => this.setState({
          serverdata: data.metadata,
          project_name: data.project_name,
          repo_name: data.repository_name,
        }))
      console.log("Received response", this.state.project_name, this.state.repo_name, this.state.serverdata)
    } else {
      return <div>Please fill repo & project and validate repository</div>
    }
  }

  handleChange(event) {
    this.setState({
      repo_name: event.target.value,
      validated: false,
    });
  }

  handleChange1(event) {
    console.log("in handlechange1 ", this.state.project_name)
    this.setState({
      project_name: event.target.value,
      validated: false,
    });
    console.log("completed handlechange1 ", this.state.project_name)
  }

  handleChange2(event) {
    console.log("in handlechange2", this.state.commit_id)
    this.setState({
      commit_id: event.target.value,
      validated: false,
    });
    console.log("completed handlechange2 ", this.state.commit_id)
  }

  handleSubmit(event) {
    console.log("in handleSubmit event")
    event.preventDefault();
  }
}

export default Search;
