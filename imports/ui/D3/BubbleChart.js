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
          confident: 11.14,
          tentative:5.7
      }
    }
    componentDidMount() {

            this.context = this.canvas.getContext("2d");
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.tau = 2 * Math.PI;

        this.nodes = [this.state.anger,this.state.fear,this.state.joy,this.state.sadness
        ,this.state.analytical,this.state.confident,this.state.tentative];

        var simulation = d3.forceSimulation(nodes)
            .velocityDecay(0.2)
            .force("x", d3.forceX().strength(0.002))
            .force("y", d3.forceY().strength(0.002))
            .force("collide", d3.forceCollide().radius(function (d) {
                return d.r + 0.5;
            }).iterations(2))
            .on("tick", this.ticked);
    }
    componentWillUpdate(){
        this.nodes = [this.state.anger,this.state.fear,this.state.joy,this.state.sadness
            ,this.state.analytical,this.state.confident,this.state.tentative];

    }

    ticked() {
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);

        context.beginPath();
        nodes.forEach(function(d) {
            context.moveTo(d.x + d.r, d.y);
            context.arc(d.x, d.y, d.r, 0, tau);
        });
        context.fillStyle = "#ddd";
        context.fill();
        context.strokeStyle = "#333";
        context.stroke();

        context.restore();
    }

    render() {

        return (
            <canvas width="960" height="960" ref={(canvas)=>{this.canvas=canvas}} ></canvas>
                );

                }

                }