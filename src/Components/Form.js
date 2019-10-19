// Doc: https://www.digitalocean.com/community/tutorials/how-to-display-data-from-the-digitalocean-api-with-react
// React tutorial: https://www.youtube.com/watch?v=DyPkojd1fas&list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&index=24
import React, { Component } from "react";
import Dashboard from "./Dashboard";

class Form extends Component {
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
      current_page_number: -1,
      total_number_of_pages: '',
      total_number_of_commits: '',
      has_next_page: false,
      has_previous_page: false,
      display_no_of_records: 5,
      author_name_commit_dic: {},
      search: ''
    };

    // Binding Event Handler: binding is required for all methods which uses const values
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleNoOfRecordsChange = this.handleNoOfRecordsChange.bind(this);

    // Binding event handler: buttonClick, button
    // please test do below code break app:
    this.buttonClick = this.buttonClick.bind(this);
    // this.buttonPrevious = this.buttonPrevious.bind(this);
    // this.buttonNext = this.buttonNext.bind(this);
  }

  validate_repository = () => {
    console.log("in validate repository: ", this.state.repo_name, this.state.project_name);
    if (this.state.repo_name != "" && this.state.project_name != "") {
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
              onClick: false,
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
    } else {
      console.log("in validate_repository else part")
      return <div>Please fill repo & project to validate</div>
    }
  }

  // = () => { causing event binding due to which we can change state values in method
  // their are many types of event binding one bind in constructor other using arrow method declaration
  // buttonClick = () => {
  //   if (this.state.repo_name != "" && this.state.project_name != "" && this.state.validated) {
  //     this.setState({ onClick: true })
  //     console.log("in button click and repo is already validated");
  //     fetch('http://127.0.0.1:8001/git/read_commits_page?repo_name=' + this.state.repo_name +
  //       '&project_name=' + this.state.project_name + '&records_per_page=' + this.state.display_no_of_records)
  //       .then(results => results.json())
  //       .then(data => this.setState({
  //         serverdata: data.metadata,
  //         current_page_number: data.current_page_number,
  //         has_next_page: data.has_next_page,
  //         has_previous_page: data.has_previous_page
  //       }))
  //       .then(body => console.log(body));
  //   } else {
  //     console.log("in button click else part")
  //     return <div>Please fill repo & project and validate repository</div>
  //   }
  // }

  buttonClick() {
    console.log("in buttonClick: ", this.state.repo_name, this.state.project_name, this.state.validated);
    if (this.state.repo_name != "" && this.state.project_name != "" && this.state.validated) {
      this.setState({ 
        onClick: true,
        serverdata: [],
        current_page_number: -1,
        has_next_page: false,
        has_previous_page: false,
      })
      
      fetch('http://127.0.0.1:8001/git/read_commits_page?repo_name=' + this.state.repo_name +
        '&project_name=' + this.state.project_name + '&records_per_page=' + this.state.display_no_of_records)
        .then(results => results.json())
        .then(data => this.setState({
          serverdata: data.metadata,
          current_page_number: data.current_page_number,
          has_next_page: data.has_next_page,
          has_previous_page: data.has_previous_page
        }))
        // .then(body => console.log(data));

        console.log("Forms completed buttonClick: ", this.state.current_page_number)
    } else {
      console.log("in button click else part")
      return <div>Please fill repo & project and validate repository</div>
    }
  }

  buttonPrevious = () => {
    // Anjali
    // <button className='button'  onClick={this.buttonPrevious} style={{ margin:"2px auto", display:"block" }} disabled={!this.state.page_number}>previous</button><button className='button'  onClick={this.buttonNext} style={{ margin:"2px auto", display:"block" }}>Next</button>
    console.log("in Previous button" + this.state.repo_name + " " +
      this.state.project_name + " current page number: " +
      this.state.current_page_number)
    let prev_page_no = this.state.current_page_number;
    prev_page_no--

    // if you want to change state value in function you have to use this.setState() ex:
    // below code is just an example of how to change state value inside method
    // this.setState = {
    //   current_page_number = this.state.current_page_number - 1
    // }, () => {
    //   console.log("callback value ", this.state.current_page_number)
    // }
    // call to this.setState() is asynchronous to console, it means console may print previous value
    // but actual value have been updated by setState()
    // console.log(this.state.current_page_number)

    // console.log("previous page number: " + prev_page_no)
    fetch('http://127.0.0.1:8001/git/read_commits_page?repo_name=' + this.state.repo_name + '&project_name=' +
      this.state.project_name + '&page_number=' + prev_page_no + '&records_per_page=' + this.state.display_no_of_records)
      .then(results => results.json())
      .then(data => this.setState({
        serverdata: data.metadata,
        current_page_number: data.current_page_number,
        has_next_page: data.has_next_page,
        has_previous_page: data.has_previous_page
      }))
      .then(results => console.log(results))
    // console.log("done buttonPrevious")
  }

  buttonNext = () => {
    console.log("in next button " + this.state.repo_name + " " + this.state.project_name +
      " current page number: " + this.state.current_page_number)
    let next_page_no = this.state.current_page_number;
    next_page_no++
    // console.log("next page number: " + next_page_no)
    fetch('http://127.0.0.1:8001/git/read_commits_page?repo_name=' + this.state.repo_name + '&project_name=' +
      this.state.project_name + '&page_number=' + next_page_no + '&records_per_page=' + this.state.display_no_of_records)
      .then(results => results.json())
      .then(data => this.setState({
        serverdata: data.metadata,
        current_page_number: data.current_page_number,
        has_next_page: data.has_next_page,
        has_previous_page: data.has_previous_page
      }))
      .then(results => console.log(results))
    // console.log("done buttonNext: ")
  }

  render() {
    let buttonPrevious, buttonNext;
    const { serverdata, has_next_page, has_previous_page } = this.state;
    console.log("Form render author name: ", serverdata)

    if (has_previous_page) {
      buttonPrevious = <button className='button' onClick={this.buttonPrevious}
        style={{ margin: "2px auto", display: "block" }}>Previous</button>
    }

    if (has_next_page) {
      buttonNext = <button className='button' onClick={this.buttonNext}
        style={{ margin: "2px auto", display: "block" }}>Next</button>
    }

    console.log("Form calling return")
    return (
      <form onSubmit={this.handleSubmit}>
        <div class="container">
          <center> <span><input type="text" ref={input => this.reponame = input} placeholder='Enter repo name' name="reponame" value={this.state.repo_name} onChange={this.handleChange} errorMessage="Email is invalid"
            emptyMessage="Email is required" required />
            <input type="text" ref={input => this.name = input} placeholder="Enter project name" name="name" value={this.state.project_name} onChange={this.handleChange1} /></span></center>
          <center><span><button class='btn' onClick={this.validate_repository}> validate_repository </button> </span></center>
        </div>

        <div className='button__container'>
          <button className='button' onClick={this.buttonClick} >Get data</button>
          {
            this.state.validated == true && this.state.onClick == true ?
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
                  <label>No of Records</label>
                  {/* Select sample impl: https://scriptverse.academy/tutorials/reactjs-select.html */}
                  {/* https://appdividend.com/2018/10/19/react-dropdown-select-example-tutorial/ */}
                  {/* <Select options={noOfRecordsPerPageList} value={this.state.display_no_of_records} onChange={this.handleNoOfRecordsChange} onInputChange={this.updateNoofRecords}/> */}
                  <select value={this.state.display_no_of_records} onChange={this.handleNoOfRecordsChange} >
                    <option value="5" >5</option>
                    <option value="10" >10</option>
                    <option value="15" >15</option>
                  </select>
                </div>
                {buttonPrevious}
                {buttonNext}
                <Dashboard location='Raipur' serverdata={this.state.serverdata} />
              </div> : null // display message from return statement in place of null
          }
        </div>
      </form>
    )
  }

  handleChange(event) {
    console.log("Form handleChange")
    this.setState({
      repo_name: event.target.value,
      validated: false,
    });
  }

  handleChange1(event) {
    console.log("Form handlechange1 ", this.state.project_name)
    this.setState({
      project_name: event.target.value,
      validated: false,
    });
  }

  handleNoOfRecordsChange(event) {
    console.log("Form handleNoOfRecordsChange ", this.state.display_no_of_records)
    this.setState({
      display_no_of_records: event.target.value,
    });
    this.buttonClick();
  }

  handleSubmit(event) {
    console.log("in handleSubmit event")
    // below method will prevent data from getting lost. Other wise after clicking on alert pop data in
    // box will be lost
    event.preventDefault();
  }
}

export default Form;
