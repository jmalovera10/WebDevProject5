import React, {Component} from 'react';
import * as d3 from "d3";


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

    }
    componentDidMount() {

        this.width = 460;
        this.height = 400;
        this.padding = 50; // separation between same-color nodes
        this.clusterPadding = 6; // separation between different-color nodes
        this.maxRadius = 20;
        this.m = 7; // number of distinct clusters



        let sum= this.state.anger+this.state.confident+this.state.analytical+this.state.fear+this.state.joy+this.state.sadness+this.state.tentative;
           this.data = {
               name: "emotions",
               value: 100,
               children:
               [{name:"anger", cluster:0, value: this.state.anger/sum*100},
           {name:"fear", cluster:1, value: this.state.fear/sum*100},
           {name:"joy", cluster:2, value: this.state.joy/sum*100},
           {name:"sadness", cluster:0, value: this.state.sadness/sum*100},
        {name:"analytical", cluster:1, value: this.state.analytical/sum*100},
        {name:"confident", cluster:2, value: this.state.confident/sum*100},
        {name:"tentative", cluster:0, value: this.state.tentative/sum*100}]};

        var width = 800, height = 600;

        var chart = d3.select(this.canvas).append("svg")
            .attr("width", width).attr("height", height)
            .append("g")
            .attr("transform", "translate(50,50)");

        var pack = d3.layout.pack()
            .size([width, height - 50])
            .padding(10);


        var nodes = pack.nodes(this.data);

        var node = chart.selectAll(".node")
            .data(nodes).enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        node.append("circle")
            .attr("r",function(d) { return d.r; })
            .attr("fill", function(d){
                if (d.children) return "#fff"
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
                if (d.children) return "#fff"
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

        node.append("text")
            .text(function(d) { return d.children ? "" : d.name; });




    }
    componentWillUpdate(){


        this.nodes = [{r:this.state.anger, emotion:"anger", cluster:0},{r:this.state.fear, emotion:"fear", cluster:2},{r:this.state.joy, emotion:"joy", cluster:3},{r:this.state.sadness, emotion:"sadness", cluster:4}
            ,{r:this.state.analytical, emotion:"analytical", cluster:5},{r:this.state.confident, emotion:"confident", cluster:6},{r:this.state.tentative, emotion:"tentative", cluster:6}];


    }
    // Resolves collisions between d and all other circles.


    render() {

        return (
            <div ref={(div)=>this.canvas=div} ></div>
                );

                }

                }