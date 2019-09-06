//Doc: https://www.digitalocean.com/community/tutorials/how-to-display-data-from-the-digitalocean-api-with-react
import React, { Component } from "react";
import axios from 'axios';
//import Table from './Components/table';
import Spinner from 'react-bootstrap/Spinner';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
//import pagination from 'react-js-pagination';
import BootstrapTable from 'react-bootstrap-table-next';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      onClick: false,
      metadata: [],
      repo_name: '', project_name: '',
      // activePage: 15
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
  }

  buttonClick = () => {
    const doesShow = this.state.onClick;
    this.setState({ onClick: !doesShow });
    
    console.log("=======Form.js: going to validate repository exist or not===========");
    fetch('http://127.0.0.1:8000/git/validate_repository?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name)

    console.log("=======Form.js: validated repository===========");
    fetch('http://127.0.0.1:8000/git/get_commits_page?repo_name=' + this.state.repo_name + '&project_name=' + this.state.project_name)
      .then(results => results.json())
      .then(data => this.setState({ metadata: data.metadata }))
      .then(results => console.log(results));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div >
          <input type="text" ref={input => this.reponame = input}
            style={{ margin: "100px auto", display: "block" }} placeholder="Enter repo name" name="reponame"
            value={this.state.repo_name} onChange={this.handleChange} required />
          <input type="text" ref={input => this.name = input} style={{ margin: "100px auto", display: "block" }}
            placeholder="Enter name" name="name" value={this.state.project_name} onChange={this.handleChange1} required />
          <div className='button__container'>
            <button className='button' onClick={this.buttonClick} style={{ margin: "100px auto", display: "block" }}>Get data</button>
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
                </div> : null
            }
          </div>
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
