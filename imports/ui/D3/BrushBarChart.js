import {BarChart, Bar, Brush, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend}  from 'recharts';

import React, {Component} from 'react';
import './BrushBarChart.css';


// App component - represents the whole app

export default class BrushBarChart extends Component {


    render() {

        return (
            <BarChart width={this.props.width} height={this.props.height} data={this.props.data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                <ReferenceLine y={0} stroke='#000'/>
                <Brush dataKey='name' height={30} stroke="#8884d8"/>
                <Bar type="monotone" dataKey="alegría" fill="rgb(221, 144, 37)" />
                <Bar type="monotone" dataKey="tristeza" fill="blue" />
                <Bar type="monotone" dataKey="miedo" fill="black" />
                <Bar type="monotone" dataKey="confianza" fill="green" />
                <Bar type="monotone" dataKey="analítica" fill="magenta" />
                <Bar type="monotone" dataKey="ira" fill="red" />
                <Bar type="monotone" dataKey="inseguridad" fill="orange" />
            </BarChart>
        );

                }

                }
