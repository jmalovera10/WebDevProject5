import React, { Component } from 'react';
import {BarChart, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';
/**Component that contains the chart*/
export default class BarChart2 extends Component {

    constructor(props) {
        super(props);
    }

    componentWillUpdate(){
        this.data = [
            {name: 'Alegría', acumulado: this.props.joy},
            {name: 'Confianza', aumulado: this.props.confident},
            {name: 'Rabia', aumulado: this.props.anger},
            {name: 'Tristeza', aumulado: this.props.sadness},
            {name: 'Analítico', aumulado: this.props.analytical},
            {name: 'Miedo', aumulado: this.props.fear},
            {name: 'Tentativo', aumulado: this.props.tentative},
        ];
    }

    render() {

        this.data = [
            {name: 'Confianza', acumulado: this.props.confident},
            {name: 'Ira', acumulado: this.props.anger},
            {name: 'Tristeza', acumulado: this.props.sadness},
            {name: 'Analítico', acumulado: this.props.analytical},
            {name: 'Miedo', acumulado: this.props.fear},
            {name: 'Tentativo', acumulado: this.props.tentative},
            {name: 'Alegría', acumulado: this.props.joy},
        ];

        return (

            <BarChart width={this.props.width} height={this.props.height} data={this.data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>

                <XAxis dataKey="name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="acumulado" fill="#8884d8"/>


            </BarChart>
        );
    }
}
