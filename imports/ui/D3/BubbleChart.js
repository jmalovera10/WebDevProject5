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
          tentative:55.7
      };
      this.tick=this.tick.bind(this);
      this.collide=this.collide.bind(this);
      this.cluster=this.cluster.bind(this);
    }
    componentDidMount() {

        this.width = 460;
        this.height = 400;
        this.padding = 50; // separation between same-color nodes
        this.clusterPadding = 6; // separation between different-color nodes
        this.maxRadius = 20;
        this.m = 7; // number of distinct clusters


        this.clusters = new Array(this.m);

           this.nodes = [{r:this.state.anger*3, emotion:"anger", cluster:0, radius: this.state.anger, x:0, y:0},
           {r:this.state.fear*3, emotion:"fear", cluster:1, radius: this.state.fear, x:100, y :100},
           {r:this.state.joy*3, emotion:"joy", cluster:2, radius: this.state.joy},
           {r:this.state.sadness*3, emotion:"sadness", cluster:0, radius: this.state.sadness},
        {r:this.state.analytical*3, emotion:"analytical", cluster:1, radius: this.state.analytical},
        {r:this.state.confident*3, emotion:"confident", cluster:2, radius: this.state.confident},
        {r:this.state.tentative*3, emotion:"tentative", cluster:0, radius: this.state.tentative}];

        let ii=0;
        this.nodes.forEach((n)=>{
            if (ii<3){
                this.clusters[ii++]={r:n.r, cluster:n.cluster};
            }

        });




        this.n = 7; // total number of nodes
        this.m = 3; // number of distinct clusters

        this.color = d3.scale.category10()
            .domain(d3.range(this.m));

// The largest node for each cluster.

/*
        this.nodes = d3.range(this.n).map(()=> {
            let i = Math.floor(Math.random() * this.m),
                r = Math.sqrt((i + 1) / this.m * -Math.log(Math.random())) * this.maxRadius,
                d = {cluster: i, radius: r};
            if (!this.clusters[i] || (r > this.clusters[i].radius)) this.clusters[i] = d;
            return d;
        });
*/
// Use the pack layout to initialize node positions.
        d3.layout.pack()
            .sort(null)
            .size([this.width, this.height])
            .children(function(d) { return d.values; })
            .value(function(d) { return d.radius * d.radius; })
            .nodes({values: d3.nest()
                    .key(function(d) { return d.cluster; })
                    .entries(this.nodes)});


        this.force = d3.layout.force()
            .nodes(this.nodes)
            .size([this.width, this.height])
            .gravity(.002)
            .charge(-0.5)
            .on("tick", this.tick)
            .start();

        this.svg = d3.select(this.canvas).append("svg")
            .attr("width", this.width)
            .attr("height", this.height);

        this.node = this.svg.selectAll("circle")
            .data(this.nodes)
            .enter().append("circle")
            .style("fill", (d)=> { return this.color(d.cluster); })
            .call(this.force.drag);
        console.log(this.node);

        this.node.transition()
            .duration(750)
            .delay(function(d, i) { return i * 5; })
            .attrTween("r", (d)=> {
                let i = d3.interpolate(0, d.radius);
                return function(t) { return d.radius = i(t); };
            });






    }
    componentWillUpdate(){


        this.nodes = [{r:this.state.anger, emotion:"anger", cluster:0},{r:this.state.fear, emotion:"fear", cluster:2},{r:this.state.joy, emotion:"joy", cluster:3},{r:this.state.sadness, emotion:"sadness", cluster:4}
            ,{r:this.state.analytical, emotion:"analytical", cluster:5},{r:this.state.confident, emotion:"confident", cluster:6},{r:this.state.tentative, emotion:"tentative", cluster:6}];


    }
    // Resolves collisions between d and all other circles.
    collide(alpha) {
        let quadtree = d3.geom.quadtree(this.nodes);
        return (d)=> {
            let r = d.radius + this.maxRadius + Math.max(this.padding, this.clusterPadding),
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function(quad, x1, y1, x2, y2) {
                if (quad.point && (quad.point !== d)) {
                    let x = d.x - quad.point.x,
                        y = d.y - quad.point.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? this.padding : this.clusterPadding);
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.point.x += x;
                        quad.point.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        };
    }
    // Move d to be adjacent to the cluster node.
    cluster(alpha) {
        return (d)=> {
            let cluster = this.clusters[d.cluster];
            if (cluster === d) return;
            let x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + cluster.radius;
            if (l !== r) {
                l = (l - r) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        };
    }
    tick(e) {
        console.log(this.node);
        this.node
            .each(this.cluster(10 * e.alpha * e.alpha))
            .each(this.collide(.5))
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { console.log(d);
            return d.y; });
    }


    render() {

        return (
            <div ref={(div)=>this.canvas=div} ></div>
                );

                }

                }