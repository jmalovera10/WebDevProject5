import React, {Component} from 'react';
import BubbleChart from "./D3/BubbleChart";
import StatsChart from "./D3/StatsChart";


// App component - represents the whole app

export default class Carousel extends Component {
    constructor(props){
        super(props);
        this.state={
            data:[

                {name: 'Dia 1', joy: 0.2, fear: 0.4, sadness: 0.9},
                {name: 'Dia 2', joy: 0.4, fear: 0.3, sadness: 0.8},
                {name: 'Dia 3', joy: 0.6, fear: 0.7, sadness: 0.77},
                {name: 'Dia 4', joy: 0.8, fear: 0.8, sadness: 0.3},
                {name: 'Dia 5', joy: 0.88, fear: 0.1, sadness: 0.6},
                {name: 'Dia 6', joy: 0.6, fear: 0.11, sadness: 0.1},
                {name: 'Dia 7', joy: 0.9, fear: 0.01, sadness: 0.8},
            ]
        }
    }


    render() {

        return (
            < div >
                <div id="demo" className="carousel slide" data-ride="carousel">

                    <ul className="carousel-indicators">
                        <li data-target="#demo" data-slide-to="0" className="active"></li>
                        <li data-target="#demo" data-slide-to="1"></li>
                        <li data-target="#demo" data-slide-to="2"></li>
                    </ul>

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <BubbleChart width={750} height={600} anger={20.3}
                                         fear={70.5}
                                         joy={10.3}
                                         sadness={80.5}
                                         analytical={60.5}
                                         confident={90.14}
                                         tentative={55.7}/>
                        </div>
                        <div className="carousel-item">
                        <StatsChart data={this.state.data}/>
                        </div>
                        <div className="carousel-item">
                            <BubbleChart width={750} height={600}
                                         anger={0.3}
                                         fear={0}
                                         joy={1}
                                         sadness={0}
                                         analytical={0}
                                         confident={0}
                                         tentative={0}/>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                        <span className="carousel-control-prev-icon">Prev</span>
                    </a>
                    <a className="carousel-control-next" href="#demo" data-slide="next">
                        <span className="carousel-control-next-icon">Next</span>
                    </a>

                </div>
            </div>);

                }

                }