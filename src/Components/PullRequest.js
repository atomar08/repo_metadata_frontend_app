import React, { Component } from "react";

const port = 8000;
class PullRequest extends Component {
  constructor() {
    super()
    this.state = {
      validated: false,
      valid_message: "",
      data: null,
      serverdata: [],
      repo_name: '',
      project_name: '',
      valid: "repository is valid",
    };

    // Binding Event Handler: binding is required for all methods which uses const values
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
   // this.handleChange2 = this.handleChange2.bind(this);

   this.pull_request = this.pull_request.bind(this);
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
              <center><span><button class='button' onClick={this.validate_repository}> Validate Repository </button> </span></center>
        </div>
        <div className='button__container'>
          <center><span><button className='button' onClick={this.pull_request}> Get Pull Request </button> </span></center>
          {/* <button className='button' onClick={this.pull_request}> Get Pull Request </button> */}
          {
            this.state.onClick == true ?
              <div className="search-results" style={{ marginTop: 10 }} >
                <div>
                  <table class="table table-bordered table-hover table-striped">
                    <thead>
                      <tr class="bg-gray text-white">
                        <th>Id</th>
                        <th>Title</th>
                        <th>Number</th>
                        <th>Created At</th>
                        <th>Merge Commit SHA</th>
                        <th>No of Changed Files</th>
                        <th>No of Deletion</th>
                        <th>Additions</th>
                        <th>Mergeable</th>
                        <th>Merge State</th>
                        <th>State</th>
                        <th>Body</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.serverdata.map(pr => (
                        <tr>
                          <td scope="row">{pr.pr_id}</td>
                          <td>{pr.pr_title}</td>
                          <td>{pr.pr_number}</td>
                          <td>{pr.pr_created_at}</td>
                          <td>{pr.pr_merge_commit_sha}</td>
                          <td>{pr.pr_no_of_changed_files}</td>
                          <td>{pr.pr_no_of_deletion}</td>
                          <td>{pr.pr_additions}</td>
                          <td>{pr.pr_is_mergeable.toString()}</td>
                          <td>{pr.pr_mergeable_state}</td>
                          <td>{pr.pr_state}</td>
                          <td>{pr.pr_body}</td>
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
    console.log("innnnnn issues validate repository: ", this.state.validated);
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

  pull_request = () => {
    console.log("in pull request method")
    if (this.state.repo_name != null && this.state.project_name != null) {
      this.setState({ onClick: true })
      console.log("in button click and repo is already validated");
      fetch('http://127.0.0.1:8000/git/get_repo_pull_requests?repo_name=' + this.state.repo_name +
      '&project_name=' + this.state.project_name)
        .then(results => results.json())
        .then(data => this.setState({
          serverdata: data.pull_request_metadata,
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

export default PullRequest;
