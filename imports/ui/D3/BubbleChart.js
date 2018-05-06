import React, {Component} from 'react';
import * as d3 from "d3";
import {Meteor} from 'meteor/meteor';


// App component - represents the whole app

export default class BubbleChart extends Component {
    constructor(props){
      super(props);
      this.state={
          anger: 20.3,
          fear: 70.5,
          joy: 10.3,
          sadness:80.5,
          analytical: 60.5,
          confident: 90.14,
          tentative:55.7
      };
        this.moreJoy=this.moreJoy.bind(this);

    }
    componentDidMount() {


        this.padding = 50; // separation between same-color nodes



        let sum= this.props.anger+this.props.confident+this.props.analytical+this.props.fear+this.props.joy+this.props.sadness+this.props.tentative;
           this.data = {
               name: "emotions",
               value: 150,
               children:
               [{name:"anger", cluster:0, value: this.props.anger/sum*100},
           {name:"fear", cluster:1, value: this.props.fear/sum*100},
           {name:"joy", cluster:2, value: this.props.joy/sum*100},
           {name:"sadness", cluster:3, value: this.props.sadness/sum*100},
        {name:"analytical", cluster:4, value: this.props.analytical/sum*100},
        {name:"confident", cluster:5, value: this.props.confident/sum*100},
        {name:"tentative", cluster:6, value: this.props.tentative/sum*100}]};



        this.chart = d3.select(this.canvas).append("svg")
            .attr("width", this.props.width).attr("height", this.props.height)
            .append("g")
            .attr("transform", "translate(50,50)");

        let pack = d3.layout.pack()
            .size([this.props.width-50, this.props.height - 50])
            .padding(10);


        let nodes = pack.nodes(this.data);
        let t = d3.transition()
            .duration(2050);

        let node = this.chart.selectAll(".node")
            .data(nodes).enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("circle")
            .attr("r",function(d) { return d.r; })
            .attr("fill", function(d){
                if (d.children) return "rgba(0,0,0,0)";
                switch (d.name) {
                    case "anger":
                        return "red";
                    case "joy":
                        return "yellow";
                    case "confident":
                        return "green";
                    case "analytical":
                        return "magenta";
                    case "tentative":
                        return "orange";
                    case "fear":
                        return "#000";
                    default:
                        return "#0080ff";

                }


            }) //make nodes with children invisible
            .attr("opacity", 0.25)
            .attr("stroke", function(d) {
                if (d.children) return "rgba(0,0,0,0)";
                switch (d.name) {
                    case "anger":
                        return "red";
                    case "joy":
                        return "yellow";
                    case "confident":
                        return "green";
                    case "analytical":
                        return "magenta";
                    case "tentative":
                        return "orange";
                    case "fear":
                        return "#000";
                    default:
                        return "#0080ff";

                }
            } ) //make nodes with children invisible
            .attr("stroke-width", 2);


        node.append("text").transition(t)
            .text(function(d) { return (d.children || d.value===0) ? "" : d.name; });




    }
    componentWillUpdate(){
      

        let sum= this.props.anger+this.props.confident+this.props.analytical+this.props.fear+this.props.joy+this.props.sadness+this.props.tentative;
        this.data = {
            name: "emotions",
            value: 150,
            children:
                [{name:"anger", cluster:0, value: this.props.anger/sum*100},
                    {name:"fear", cluster:1, value: this.props.fear/sum*100},
                    {name:"joy", cluster:2, value: this.props.joy/sum*100},
                    {name:"sadness", cluster:0, value: this.props.sadness/sum*100},
                    {name:"analytical", cluster:1, value: this.props.analytical/sum*100},
                    {name:"confident", cluster:2, value: this.props.confident/sum*100},
                    {name:"tentative", cluster:0, value: this.props.tentative/sum*100}]};


        this.chart.remove();
        this.chart = d3.select(this.canvas).select("svg")
            .attr("width", this.props.width).attr("height", this.props.height)
            .append("g")
            .attr("transform", "translate(50,50)");
        var pack = d3.layout.pack()
            .size([this.props.width-50, this.props.height - 50])
            .padding(10);


        var nodes = pack.nodes(this.data);
        var t = d3.transition()
            .duration(2050);

        var nodeEnter = this.chart.selectAll(".node")
            .data(nodes).enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        nodeEnter.append("circle")
            .attr("r",function(d) { return d.r; })
            .attr("fill", function(d){
                if (d.children) return "rgba(0,0,0,0)";
                switch (d.name) {
                    case "anger":
                        return "red";
                    case "joy":
                        return "rgb(221, 144, 37)";
                    case "confident":
                        return "green";
                    case "analytical":
                        return "magenta";
                    case "tentative":
                        return "orange";
                    case "fear":
                        return "#000";
                    default:
                        return "#0080ff";

                }


            }) //make nodes with children invisible
            .attr("opacity", 0.25)
            .attr("stroke", function(d) {
                if (d.children) return "";
                switch (d.name) {
                    case "anger":
                        return "red";
                    case "joy":
                        return "rgb(221, 144, 37)";
                    case "confident":
                        return "green";
                    case "analytical":
                        return "magenta";
                    case "tentative":
                        return "orange";
                    case "fear":
                        return "#000";
                    default:
                        return "#0080ff";

                }
            } ) //make nodes with children invisible
            .attr("stroke-width", 2);

        nodeEnter.append("text").transition(t)
            .text(function(d) { return (d.children || d.value===0)? "" : d.name; });



    }
    // Resolves collisions between d and all other circles.

    moreJoy(){
        this.setState((prevState)=>{return {joy: prevState.joy+10}});

    }
    render() {

        return (
            <div>
            <div ref={(div)=>this.canvas=div} ></div>

            </div>
                );

                }

                }