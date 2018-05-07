import React, {Component} from 'react';
import "./Barchart.css";
import * as d3 from "d3";


// App component - represents the whole app

export default class BarChart extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {

        this.data = [{name: "anger", value: this.props.anger},
            {name: "fear", value: this.props.fear},
            {name: "joy", value: this.props.joy},
            {name: "sadness", value: this.props.sadness},
            {name: "analytical", value: this.props.analytical},
            {name: "confident", value: this.props.confident},
            {name: "tentative", value: this.props.tentative}];
        let y = d3.scale.linear()
            .range([this.props.height, 0]);

        let chart = d3.select(".chart")
            .attr("width", this.props.width)
            .attr("height", this.props.height);


        let barWidth = this.props.width / this.data.length;

        let bar = chart
            .data(this.data)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * barWidth + ",0)";
            });

        bar.append("rect")
            .attr("y", (d) => {
                return y(d.value);
            })
            .attr("height", (d) => {
                return this.props.height - y(d.value);
            })
            .attr("width", barWidth - 1);

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", (d) => {
                return y(d.value) + 3;
            })
            .attr("dy", ".75em")
            .text((d) => {
                console.log(d);
                return d.name;
            });


    }

    componentWillUpdate() {
        this.data = [{name: "anger", value: this.props.anger},
            {name: "fear", value: this.props.fear},
            {name: "joy", value: this.props.joy},
            {name: "sadness", value: this.props.sadness},
            {name: "analytical", value: this.props.analytical},
            {name: "confident", value: this.props.confident},
            {name: "tentative", value: this.props.tentative}];

        let y = d3.scale.linear()
            .range([this.props.height, 0]);

        let chart = d3.select(".chart")
            .attr("width", this.props.width)
            .attr("height", this.props.height);


        let barWidth = this.props.width / this.data.length;

        let barEnter = chart
            .data(this.data)
            .enter().append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * barWidth + ",0)";
            });
        let bar = chart
            .data(this.data).append("g")
            .attr("transform", function (d, i) {
                return "translate(" + i * barWidth + ",0)";
            });
        let barD = chart.selectAll("g")
            .data(this.data).exit().remove();


        barEnter.append("rect")
            .attr("y", (d) => {
                return y(d.value);
            })
            .attr("height", (d) => {
                return this.props.height - y(d.value);
            })
            .attr("width", barWidth - 1);

        barEnter.append("text")
            .attr("x", barWidth / 2)
            .attr("y", (d) => {
                return y(d.value) + 3;
            })
            .attr("dy", ".75em")
            .text((d) => {
                console.log(d);
                return d.name;
            });
        bar.append("rect")
            .attr("y", (d) => {
                return y(d.value);
            })
            .attr("height", (d) => {
                return this.props.height - y(d.value);
            })
            .attr("width", barWidth - 1);

        bar.append("text")
            .attr("x", barWidth / 2)
            .attr("y", (d) => {
                return y(d.value) + 3;
            })
            .attr("dy", ".75em")
            .text((d) => {
                console.log(d);
                return d.name;
            });


    }

    type(d) {
        d.value = +d.value; // coerce to number
        return d;
    }

    render() {

        return (
            <svg className="chart"></svg>

        );

    }

}