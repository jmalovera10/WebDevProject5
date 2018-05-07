import React, {Component} from 'react';
import "./Barchart.css";
import * as d3 from "d3";


// App component - represents the whole app

export default class BarChart extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){


        let y = d3.scale.linear()
            .range([this.props.height, 0]);

        let chart = d3.select(".chart")
            .attr("width", this.props.width)
            .attr("height", this.props.height);



            let barWidth = this.props.width / this.props.data.length;

            let bar = chart.selectAll("g")
                .data(this.props.data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

            bar.append("rect")
                .attr("y", (d)=> { return y(d.value); })
                .attr("height", (d)=> { return this.props.height - y(d.value); })
                .attr("width", barWidth - 1);

            bar.append("text")
                .attr("x", barWidth / 2)
                .attr("y", (d) =>{ return y(d.value) + 3; })
                .attr("dy", ".75em")
                .text( (d)=> { return d.value; });

    }

    componentWillUpdate(){
        let chart = d3.select(".chart")
            .attr("width", this.props.width)
            .attr("height", this.props.height);


            let barWidth = this.props.width / data.length;

            let barEnter = chart.selectAll("g")
                .data(this.props.data)
                .enter().append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
            let bar = chart.selectAll("g")
                .data(this.props.data).append("g")
                .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });
            let barD = chart.selectAll("g")
                .data(this.props.data).exit().remove();


            barEnter.append("rect")
                .attr("y", (d)=> { return y(d.value); })
                .attr("height", (d)=> { return this.props.height - y(d.value); })
                .attr("width", barWidth - 1);

            barEnter.append("text")
                .attr("x", barWidth / 2)
                .attr("y",(d) =>{ return y(d.value) + 3; })
                .attr("dy", ".75em")
                .text((d)=> { return d.value; });
            bar.append("rect")
                .attr("y", (d) =>{ return y(d.value); })
                .attr("height", (d)=> { return this.props.height - y(d.value); })
                .attr("width", barWidth - 1);

            bar.append("text")
                .attr("x", barWidth / 2)
                .attr("y", (d)=> { return y(d.value) + 3; })
                .attr("dy", ".75em")
                .text((d)=> { return d.value; });

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