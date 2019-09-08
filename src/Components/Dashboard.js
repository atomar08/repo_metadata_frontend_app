import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import axios from 'axios';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData,
            chartData: {}
        }
    }
    componentWillMount() {
        this.getChartData();
    }

    getChartData() {
        // Ajax call here and fill data as required
        this.setState({
            chartData: {
                labels: ['Bo', 'Wo', 'Sp', 'Lo', 'Ca', 'Ne Be'],
                datasets: [{
                    label: 'Population',
                    data: [
                        617594,
                        181045,
                        153060,
                        106519,
                        105162,
                        95072
                    ],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 132, 0.6)',
                        'rgba(75, 192, 132, 0.6)',
                        'rgba(153, 102, 132, 0.6)',
                        'rgba(255, 159, 132, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ]
                }]
            }
        });
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'City'
    }

    render() {
        return (
            <div className="barChart">
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Largest Cities In ' + this.props.location,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                        //                        maintainAspectRatio: false
                    }}
                />

                <Line
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Largest Cities In ' + this.props.location,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                        //                        maintainAspectRatio: false
                    }}
                />


                <Pie
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Largest Cities In ' + this.props.location,
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                        //                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default Dashboard;
