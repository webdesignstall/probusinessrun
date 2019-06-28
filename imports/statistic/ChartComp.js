import React, { Component } from 'react';
import Chart from 'chart.js';
import 'chartjs-plugin-labels';

export default class ChartComp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: ['Africa', 'Asia', 'Europe', 'Latin America', 'North America'],
            datasets: [
                {
                    label: 'Population (millions)',
                    backgroundColor: [
                        '#1abc9c',
                        '#2ecc71',
                        '#3498db',
                        '#9b59b6',
                        '#34495e',
                        '#16a085',
                        '#27ae60',
                        '#2980b9',
                        '#8e44ad',
                        '#2c3e50',
                        '#f1c40f',
                        '#e67e22',
                        '#e74c3c',
                        '#ecf0f1',
                        '#f39c12',
                        '#d35400',
                        '#c0392b'
                    ],
                    data: [2478, 5267, 734, 784, 433]
                }
            ]
        };

        this.listOfData = this.listOfData.bind(this);
        this.canvas = React.createRef();
    }

    componentDidMount() {
        const { labels, datasets } = this.state;
        Chart.defaults.global.defaultFontFamily = 'Roboto';
        Chart.defaults.global.defaultFontSize = 16;
        new Chart(this.canvas.current, {
            type: 'pie',
            data: {
                labels,
                datasets
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                    text: 'Predicted world population (millions) in 2050'
                },
                tooltips: {
                    callbacks: {
                        label: function(tooltipItem, data) {
                            var dataset = data.datasets[tooltipItem.datasetIndex];
                            var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                            var total = meta.total;
                            var currentValue = dataset.data[tooltipItem.index];
                            var percentage = parseFloat(((currentValue / total) * 100).toFixed(1));
                            return currentValue + ' (' + percentage + '%)';
                        },
                        title: function(tooltipItem, data) {
                            return data.labels[tooltipItem[0].index];
                        }
                    }
                },
                responsive: false,
                plugins: {
                    labels: {
                        render: 'label',
                        textShadow: true,
                        position: 'border',
                        fontColor: '#fff',
                        shadowColor: '#000'
                    }
                }
            }
        });
    }

    listOfData() {
        const { data } = this.state.datasets[0];
        let percentageData = [];
        let percentCalculate = () => {
            let total = 0;
            data.map(data => {
                total += data;
            });
            data.map(data => {
                percentageData.push(((data / total) * 100).toFixed(1));
            });
        };

        percentCalculate();

        return this.state.labels.map((label, index) => {
            return (
                <div key={'chart_list' + index} className="chart_list_render">
                    <span className="chart_list_label">{label}</span>{' '}
                    <span className="chart_list_value">{data[index]}</span>{' '}
                    <span className="chart_list_value">{percentageData[index]}</span>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <canvas
                    className="statistic__chart"
                    ref={this.canvas}
                    id="myChart"
                    width="400"
                    height="400"
                />
                {this.listOfData()}
            </div>
        );
    }
}
