import React, { Component } from "react";

import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
const port = 8000;
class Issue extends Component {
  constructor() {
    super()
    this.state = {
      validated: false,
      valid_message: "",
      data: null,
      serverdata: [],
      metadata: [],
      repo_name: '',
      project_name: '',
      RepoError: '',
      projectError: '',
      valid: "repository is valid",
     
    };

    // Binding Event Handler: binding is required for all methods which uses const values
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
   // this.handleChange2 = this.handleChange2.bind(this);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="container">

          <center> <span><input type="text" ref={input => this.reponame = input} placeholder='Enter repo name' name="reponame" value={this.state.repo_name} onChange={this.handleChange}
            emptyMessage="Email is required" required />
            <input type="text" ref={input => this.name = input} placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1}
              emptyMessage="Email is required" required /></span></center><br></br>

          
          {/* <input type="text" ref={input => this.name = input} placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1} errorMessage="Email is invalid"
              emptyMessage="Email is required" required /></center> */}
              <center><span><button class='btn' onClick={this.validate_repository}> validate_repository </button> </span></center>
        </div>
        <div className='button__container'>
          <center><span><button class='btn' onClick={this.search_data}> Pull Issue </button> </span></center>
          {
            this.state.onClick == true ?
              <div className="search-results" style={{ marginTop: 10 }} >
                <div>
                  <table class="table table-bordered table-hover table-striped">
                    <thead>
                      <tr class="bg-gray text-white">
                        <th>issue_no</th>
                        <th>issue_id</th>
                        <th>issue_title</th>
                        <th>issue_state</th>
                        <th>issue_number</th>
                        <th>issue_milestone</th>
                        <th>Issue_body</th>
                        <th>issue_user_name</th>
                        <th>issue_user_login</th>
                        <th>issue_comment_count</th>
                        <th>Issue_created_at</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.serverdata.map(issue => (
                        <tr>
                          <td scope="row">{issue.issue_no}</td>
                          <td>{issue.issue_id}</td>
                          <td>{issue.issue_title}</td>
                          <td>{issue.issue_state}</td>
                          <td>{issue.issue_number}</td>
                          <td>{issue.issue_milestone}</td>
                          <td>{issue.issue_body}</td>
                          <td>{issue.issue_user_name}</td>
                          <td>{issue.issue_user_login}</td>
                          <td>{issue.issue_comment_count}</td>
                          <td>{issue.issue_created_at}</td>
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
    fetch('http://127.0.0.1:8000/git/validate_repository?repo_name=' + this.state.repo_name + '&project_name=' +
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

  issue = () => {
    if (this.state.repo_name != null && this.state.project_name != null && this.state.commit_id != null) {
      this.setState({ onClick: true })
      console.log("in button click and repo is already validated");
      fetch('http://127.0.0.1:8000/git/get_repo_issues?repo_name=' + this.state.repo_name +
      '&project_name=' + this.state.project_name)
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

  

  handleSubmit(event) {
    console.log("in handleSubmit event")
    event.preventDefault();
  }
}

export default Issue;
