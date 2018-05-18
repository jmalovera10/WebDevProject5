import React, {Component} from 'react';
import BubbleChart from "../D3/BubbleChart";
import BarChart2 from "../D3/BarChart2";
import BrushBarChart from "../D3/BrushBarChart";
import "./Carousel.css";


// App component - represents the whole app

export default class Carousel extends Component {
    constructor(props){
        super(props);
        this.state={

        }
    }

    componentDidMount(){

    }
    componentWillUpdate(){

    }

    render() {
        this.totalanalytical=0;
        this.totalanger=0;
        this.totalconfident=0;
        this.totalfear=0;
        this.totaljoy=0;
        this.totalsadness=0;
        this.totaltentative=0;
        if(this.props.tones && this.props.tones.length>0) {
            this.props.tones.forEach((tones)=>{
                tones.tone.forEach((t) => {
                    switch (t.tone_id) {
                        case "anger":
                            this.totalanger += t.score;
                            break;
                        case "joy":
                            this.totaljoy += t.score;
                            break;
                        case "confident":
                            this.totalconfident += t.score;
                            break;
                        case "analytical":
                            this.totalanalytical += t.score;
                            break;
                        case "tentative":
                            this.totaltentative += t.score;
                            break;
                        case "fear":
                            this.totalfear += t.score;
                            break;
                        default:
                            this.totalsadness += t.score;
                            break;

                    }
                })
            })
        }
        this.historical=[]  ;
        this.props.tones.forEach((day)=>{
            let element={
                ira:0,
                alegría:0,
                confianza:0,
                analítica:0,
                tentatividad:0,
                miedo:0,
                tristeza:0
            };
            element.name=day.created_at;

            day.tone.forEach((t)=>{
                switch (t.tone_id) {
                    case "anger":
                        element.ira=t.score;
                        break;
                    case "joy":
                        element.alegría=t.score;
                        break;
                    case "confident":
                        element.confianza=t.score;
                        break;
                    case "analytical":
                        element.analítica=t.score;
                        break;
                    case "tentative":
                        element.inseguridad=t.score;
                        break;
                    case "fear":
                        element.miedo=t.score;
                        break;
                    default:
                        element.tristeza=t.score;
                        break;

                }
            });
            this.historical.push(element);
        });


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
                            <BarChart2 width={600} height={550}
                                         anger={this.totalanger}
                                         fear={this.totalfear}
                                         joy={this.totaljoy}
                                         sadness={this.totalsadness}
                                         analytical={this.totalanalytical}
                                         confident={this.totalconfident}
                                         tentative={this.totaltentative}/>


                        </div>
                        <div className="carousel-item">
                            <BubbleChart width={650} height={550}
                                         anger={this.totalanger}
                                         fear={this.totalfear}
                                         joy={this.totaljoy}
                                         sadness={this.totalsadness}
                                         analytical={this.totalanalytical}
                                         confident={this.totalconfident}
                                         tentative={this.totaltentative}/>

                        </div>
                        <div className="carousel-item">
                            <BrushBarChart width={600} height={550} data={this.historical}/>
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