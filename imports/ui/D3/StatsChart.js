import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

/**Component that contains the chart*/
export default class StatsChart extends Component{
    render() {

        return (
            <div className="row justify-content-around center-items chart-content">
                <LineChart width={750} height={600} data={this.props.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis  dataKey="name" />
                    <YAxis orientation="left" domain={["dataMin", "dataMax"]}/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <br/>
                    <Legend />
                    <Line type="monotone" dataKey="joy" stroke="yellow" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="sadness" stroke="blue" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="fear" stroke="black" activeDot={{r: 8}}/>
                </LineChart>
            </div>
        );
    }
}