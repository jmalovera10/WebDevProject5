import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

/**Component that contains the chart*/
export default class StatsChart extends Component{
    render() {

        return (
            <div className="row justify-content-around center-items chart-content">
                <LineChart width={this.props.width} height={this.props.height} data={this.props.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis  dataKey="name" />
                    <YAxis orientation="left" domain={["dataMin", "dataMax"]}/>
                    <Tooltip/>
                    <br/>
                    <Legend />
                    <Line type="monotone" dataKey="joy" stroke="rgb(221, 144, 37)" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="sadness" stroke="blue" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="fear" stroke="black" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="confident" stroke="green" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="analytical" stroke="magenta" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="anger" stroke="red" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="tentative" stroke="orange" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}