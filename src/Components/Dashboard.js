import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'

// Basic of Javascripts:
// https://javascript.info/

// Reference Site:
// https://stackoverflow.com/questions/53415128/wait-for-data-to-be-fetched-in-child-components-then-render
// https://blog.logrocket.com/patterns-for-data-fetching-in-react-981ced7e5c56/
// https://scotch.io/tutorials/asynchronous-javascript-using-async-await
// https://scotch.io/tutorials/react-async-for-declarative-data-fetching
// https://engineering.musefind.com/react-lifecycle-methods-how-and-when-to-use-them-2111a1b692b1


// Examples Site:
// https://jerairrest.github.io/react-chartjs-2/
// https://github.com/jerairrest/react-chartjs-2/tree/master/example/src/components
// https://www.chartjs.org/docs/latest/axes/cartesian/category.html
// https://github.com/reactjs/react-chartjs

// Types of charts: https://www.chartjs.org/samples/latest/
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: {},
        };
        this.populateAuthorList = this.populateAuthorList.bind(this);
    }

    populateAuthorList(serverdata) {
        console.log("DB populateAuthorList: ", serverdata)
        var author_dic = {};
        Object.values(serverdata).map((type) => {
            console.log("in loop: ", type.author_name)
            if (type.author_name in author_dic) {
                author_dic[type.author_name] = author_dic[type.author_name] + 1
            }
            else {
                if (type.author_name == "") {
                    if (!("UnKnown" in author_dic))
                        author_dic["UnKnown"] = 1
                    else
                        author_dic["UnKnown"] = author_dic["UnKnown"] + 1
                }
                else
                    author_dic[type.author_name] = 1
            }
        })
        console.log("DB out populateAuthorList: ", author_dic)
        return author_dic;
    }

    // componentWillMount() {
    //     console.log("DB componentWillMount")
    //     this.getChartData();
    //     console.log("DB out componentWillMount")
    // }

    componentWillReceiveProps(nextProps) {
        console.log("DB componentWillReceiveProps: ", nextProps.serverdata)
        let author_name_commit_dic = this.populateAuthorList(nextProps.serverdata)
        this.getChartData(author_name_commit_dic);
        console.log("DB out componentWillReceiveProps: ", this.state.chartData)
    }

    getChartData(author_name_commit_dic) {
        let author_name_list = []
        let author_commit_count_list = []

        for (let key in author_name_commit_dic) {
            author_name_list.push(key)
            author_commit_count_list.push(author_name_commit_dic[key])
        }
        console.log("DB getCharData: ", author_name_list, author_commit_count_list)

        this.setState({
            chartData: {
                labels: author_name_list,
                datasets: [{
                    label: 'Author\'s Name',
                    data: author_commit_count_list,
                    borderColor: 'rgba(0, 0, 0, 0.6)',  // black
                    backgroundColor: [
                        'rgba(0, 0, 128, 0.6)',         // navy
                        'rgba(0, 0, 255, 0.6)',         // blue
                        'rgba(0, 128, 0, 0.6)',         // green
                        'rgba(0, 128, 128, 0.6)',       // teal
                        'rgba(0, 255, 255, 0.6)',       // aqua
                        'rgba(128, 0, 0, 0.6)',         // maroon
                        'rgba(192, 192, 192, 0.6)',     // silver
                        'rgba(255, 0, 0, 0.6)',         // red
                        'rgba(255, 0, 255, 0.6)',       // fuchsia
                        'rgba(255, 255, 0, 0.6)',       // yellow
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(75, 192, 132, 0.6)',
                        'rgba(153, 102, 132, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(255, 206, 132, 0.6)',
                        'rgba(255, 159, 132, 0.6)',
                        'rgba(255, 99, 132, 0.6)'
                    ],
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(0, 255, 0, 0.6)',   // lime
                    hoverBorderColor: 'rgba(0, 0, 0, 0.6)',         // black
                    // pointHitRadius: 0,
                    // yAxisID: 'y-axis-1'
                }]
            }
        });
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        fontSize: 15,
    }

    render() {
        console.log("DB rendering dashboard: ", this.state.chartData)
        return (
            <div className="barChart">
                <h2>From Current Commits</h2>
                <Bar
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Commits Per Author',
                            fontSize: this.props.fontSize,
                        },
                        legend: {
                            display: false,
                            position: 'bottom',
                        },
                        maintainAspectRatio: true,
                        scales: {
                            yAxes: [{
                                // type: 'linear',
                                // display: true,
                                // position: 'left',
                                // id: 'y-axis-1',
                                // gridLines: {
                                //     display: true
                                // },
                                // labels: {
                                //     show: true
                                // },
                                ticks: {
                                    min: 0,
                                }
                            },
                            ]
                        }
                    }}
                />

                <Pie
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Commits Distribution',
                            fontSize: this.props.fontSize,
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                        //                        maintainAspectRatio: false
                    }}
                />

                {/* <Line
                    data={this.state.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Number of Commits/Author',
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        //                        maintainAspectRatio: false
                    }}
                /> */}

            </div>
        )
    }
}

export default Dashboard;
