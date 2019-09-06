import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Data: {}
    }
  }

  componentDidMount() {
    axios.get(`http://127.0.0.1:8000/git/get_commits?repo_name=cs537&project_name=atomar08`)
      .then(res => {
        const football = res.data;
        let playername = [];
        let playerscore = [];
        football.forEach(element => {
          playername.push(element.name);
          playerscore.push(element.score);
        });
        this.setState({
          Data: {
            labels: playername,
            datasets: [
              {
                label: 'Champions League 2017/2018 Top Scorer',
                data: playerscore,
                backgroundColor: [
                  'rgba(255,105,145,0.6)',
                  'rgba(155,100,210,0.6)',
                  'rgba(90,178,255,0.6)',
                  'rgba(240,134,67,0.6)',
                  'rgba(120,120,120,0.6)',
                  'rgba(250,55,197,0.6)'
                ]
              }
            ]
          }
        });
      })
  }
  render() {
    return (
      <div>
        <Bar
          data={this.state.Data}
          options={{ maintainAspectRatio: false }} />
      </div>
    )
  }
}
export default BarChart;
