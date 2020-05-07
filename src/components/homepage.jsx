import React, { Component } from 'react';

import axios from 'axios';
import Navigation from "./navigation";
import PropTypes from "prop-types";

import { Grid, Message } from 'semantic-ui-react'
import GeoChart from './geochart';
import CountUp from 'react-countup';
import "./css/homepage.css";


class Homepage extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data_all: [],
            overall: [],
            recovered: 1,
            cases: 1,
            deaths: 1,

        }

    }


    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios
            .get("http://127.0.0.1:8000/api/get/data/",
                config)
            .then(res => {
                const datum = res.data
                this.setState({ data_all: datum })
            })
            .catch(err => {
                console.log("error")
            });

        axios
            .get("http://127.0.0.1:8000/api/get/all/",
                config)
            .then(res => {
                const datum = res.data
                this.setState({
                    overall: datum, cases: datum['cases'],
                    deaths: datum['deaths'],
                    recovered: datum['recovered']

                })
            })
            .catch(err => {
                console.log("error")
            });



    }

    render() {

        const elements = [];
        const ov = this.state.overall;
        const data = this.state.data_all;

        const deaths = (<CountUp className='countup' delay={1} end={this.state.deaths} />);

        const cases = (<CountUp className='countup' delay={1} end={this.state.cases} />);
        const recoveries = (<CountUp className='countup' delay={1} end={this.state.recovered} />)

        return (

            <div className="all-wrapper">

                <Navigation />

                <div className="homepage-row">


                    <Grid stackable centered>

                        <Grid.Row className="top-row" color="">
                            <h1> Covid-19 World Project </h1>
                        </Grid.Row>
                        <Grid.Row className="bottom-row" color="" columns={3}>
                            <Grid.Column textAlign="center">
                                <Message
                                    size="small"
                                    color="blue"
                                    className="stat-message"
                                    icon='chart line'
                                    header='Cases'
                                    content={cases}
                                />
                                {/* <CountUp className='countup' prefix="Cases: " delay={1} end={this.state.cases} /> */}

                            </Grid.Column >
                            <Grid.Column textAlign="center" >
                                <Message
                                    size="small"
                                    color="blue"

                                    className="stat-message"
                                    icon='heartbeat'
                                    header='Recovered'
                                    content={recoveries}

                                ></Message>
                                {/* <CountUp className='countup' prefix="Recovered: " delay={1} end={this.state.recovered} /> */}
                            </Grid.Column>
                            <Grid.Column textAlign="center" >
                                <Message
                                    size="small"
                                    color="blue"
                                    className="stat-message"
                                    icon='plus square'
                                    header='Deaths'
                                    content={deaths}

                                />
                                {/* <CountUp className='countup' prefix="Deaths: " delay={1} end={this.state.deaths} /> */}

                            </Grid.Column>

                        </Grid.Row>
                    </Grid>
                </div>

                <GeoChart data_all={this.state.data_all}></GeoChart>
                <div className="more-info">

                    <Message color='blue' className='message' size='huge'>
                        <Message.Header className="message-header">Map Usage</Message.Header>
                        <Message.List>
                            <Message.Item>Click on a continent to zoom on continent</Message.Item>
                            <Message.Item>Click on a country to view country stats</Message.Item>
                            <Message.Item>Click on the more-info button once it appears to view dedicated country statistics page </Message.Item>
                        </Message.List>
                    </Message>

                </div>


            </div >

        );
    }
}

export default Homepage;