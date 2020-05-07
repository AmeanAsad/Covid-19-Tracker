import React, { Component } from 'react';
import Navigation from "./navigation"
import axios from 'axios';
import { Pie, Polar } from 'react-chartjs-2';
import { Grid, Table, Dropdown, Message, Segment, Progress, Button } from "semantic-ui-react";
import CountUp from 'react-countup';
import "./css/countryview.css";
import { Link } from "react-router-dom";


// Per Capita death rate, recovery rate, infection rate

// Postman

const options = [
    { text: 'Overall Statistics', value: 'Overall Statistics' },
    { text: 'Per Million Statistics', value: 'Per Million Statistics' },
]
class Country extends Component {
    constructor() {
        super();
        this.state = {
            countries: [],
            data: [],
            todayDeaths: '0',
            todayCases: '0',
            cases: '0',
            recovered: 1,
            active: 1,
            cases: 1,
            deaths: 1,
            critical: "0",
            casesPerOneMillion: 1,
            deathsPerOneMillion: 1,
            totalTests: 1,
            testsPerOneMillion: 1,
            value: "Overall Statistics"
        };

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        const {
            match: { params }
        } = this.props;

        console.log(params.country)
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios
            .get(`https://coronavirus-19-api.herokuapp.com/countries/${params.country}`,
                config)
            .then(res => {
                const datum = res.data
                this.setState({
                    data: datum,
                    todayDeaths: datum["todayDeaths"],
                    todayCases: datum['todayCases'],
                    cases: datum['cases'],
                    recovered: datum['recovered'],
                    active: datum['active'],
                    deaths: datum['deaths'],
                    critical: datum['critical'],
                    casesPerOneMillion: datum['casesPerOneMillion'],
                    deathsPerOneMillion: datum['deathsPerOneMillion'],
                    totalTests: datum['totalTests'],
                    testsPerOneMillion: datum['testsPerOneMillion'],

                })
            })
            .catch(err => {
                console.log("error")
            });

        axios
            .get("http://127.0.0.1:8000/api/get/countries/",
                config)
            .then(res => {
                const datum = res.data
                this.setState({ countries: datum })
            })
            .catch(err => {
                console.log("error")
            });




    }

    onChange(e, data) {
        this.setState({ value: data.value, option: data.text });
    }



    render() {
        const data = {
            labels: ["Active", "Deaths", "Recoveries"],
            datasets: [{
                data: [this.state.active, this.state.deaths, this.state.recovered],
                backgroundColor: [
                    '#1d3557',
                    '#457b9d',
                    '#a8dadc'
                ],
                hoverBackgroundColor: [
                    '#001233',
                    '#001233',
                    '#001233'
                ]
            }]
        };

        const value = this.state.value;

        const header = [];
        const body = [];
        const datum = this.state.countries
        const recovery_rate = Math.round((this.state.recovered / (this.state.cases)) * 100)
        const death_rate = Math.round((this.state.deaths / (this.state.cases)) * 100)
        const table_side = [];

        for (var i = 0; i < datum.length; i++) {
            const table_row = (
                <Table.Row className="table-row">
                    <Table.Cell textAlign="center" id='row-2' width={3}>{datum[i]['cases']}</Table.Cell>

                    <Table.Cell textAlign="center" id='row-1' width={3}><a href={'/info/' + datum[i]['country']}><h3>{datum[i]['country']} </h3></a> </Table.Cell>

                </Table.Row >

            )
            table_side.push(table_row)
        }

        console.log(table_side)

        const header1 = (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2} />
                    <Table.HeaderCell width={2}> Quantity (PerMillion)</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

        )

        const header2 = (
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell width={2} />
                    <Table.HeaderCell width={2}> Quantity </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        )


        const table_body1 = (
            <Table.Body >
                <Table.Row >
                    <Table.Cell>Cases</Table.Cell>
                    <Table.Cell >{this.state.casesPerOneMillion}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Deaths</Table.Cell>
                    <Table.Cell>{this.state.deathsPerOneMillion}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Tests</Table.Cell>
                    <Table.Cell>{this.state.testsPerOneMillion}</Table.Cell>
                </Table.Row>
            </Table.Body>

        )

        const table_body2 = (
            <Table.Body >
                <Table.Row >
                    <Table.Cell>Cases</Table.Cell>
                    <Table.Cell >{this.state.cases}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Deaths</Table.Cell>
                    <Table.Cell>{this.state.deaths}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Active</Table.Cell>
                    <Table.Cell>{this.state.active}</Table.Cell>
                </Table.Row>

            </Table.Body>
        )

        if (value == "Per Million Statistics") {
            header.push(header1);
            body.push(table_body1);
        } else {
            header.push(header2);
            body.push(table_body2);
        }



        const cases = (<CountUp className='countup' delay={1} end={this.state.cases} />);

        const today_deaths = (<CountUp className='countup' delay={1} end={this.state.todayDeaths} />);
        const today_cases = (<CountUp className='countup' delay={1} end={this.state.todayCases} />)
        const critical_cases = (this.state.critical != null) ? (<CountUp className='countup' delay={1} end={this.state.critical} />) : <h4>N/A</h4>
        const recovery_progress = (this.state.recovered != null) ? (<Progress size='large' color='green' percent={recovery_rate} progress />) : (<h4> N/A</h4>)
        const death_progess = (this.state.deaths != null) ? (<Progress size='large' color='red' percent={death_rate} progress />) : (<h4> N/A</h4>)
            (<h4> N/A</h4>)
        const active_cases = (this.state.active != null) ? (<p><CountUp className='count' delay={1} end={this.state.active} /> </p>) : (<h3> N/A</h3>)
        const active_percentage = (this.state.active != null) ? (<h4>{Math.round((this.state.active / (this.state.cases)) * 100)}%</h4>) : (<h3> N/A</h3>)
        const tests = (this.state.totalTests != null) ? (<p className='total-tests'> <CountUp className='count' delay={1} end={this.state.totalTests} /></p>) : (<h4>N/A</h4>)


        return (<div>

            <Navigation>
            </Navigation>


            <div className="content-wrapper">

                <div className='left'>
                    <Table singleLine>

                        <Table.Body className="table-body">
                            {table_side}
                        </Table.Body>

                    </Table>
                </div>

                <div className="right-column">



                    <Segment>



                        <Grid stackable centered>


                            <Grid.Column></Grid.Column>
                            <Grid.Row className='header-row'  >
                                <h1> {this.state.data['country']} </h1>
                            </Grid.Row>


                            <Grid.Row className='row-stat' columns={4}>
                                <Grid.Column width={4} textAlign="center">
                                    <Message
                                        size="small"
                                        // color="blue"

                                        className="stat-message"
                                        icon='chart line'
                                        header='Cases'
                                        content={cases}

                                    ></Message>
                                </Grid.Column >
                                <Grid.Column width={4} textAlign="center" >
                                    <Message
                                        size="small"
                                        // color="blue"
                                        className="stat-message"
                                        icon='ambulance'
                                        header='Critical Cases'
                                        content={critical_cases}

                                    ></Message>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign="center" >
                                    <Message
                                        size="small"
                                        // color="blue"
                                        className="stat-message"
                                        icon='arrow alternate circle up'
                                        header='Today Cases'
                                        content={today_cases}

                                    ></Message>
                                </Grid.Column>
                                <Grid.Column width={4} textAlign="center" >
                                    <Message
                                        size="small"
                                        // color="blue"
                                        className="stat-message"
                                        icon='plus square'
                                        header='Today Deaths'
                                        content={today_deaths}

                                    ></Message>
                                </Grid.Column>



                            </Grid.Row>


                            <Grid.Row>

                                <Grid.Column width={5}>

                                    <Segment id='segment'  >
                                        <h3> Current Recovery %:</h3>
                                        <p> {recovery_progress}</p>

                                    </Segment>
                                    <Segment id='segment'  >
                                        <h3> Current Death %:</h3>
                                        <p> {death_progess}</p>

                                    </Segment>


                                </Grid.Column >
                                <Grid.Column width={3}>


                                    <Segment id='segment-2'  >

                                        <h4>Active %: </h4>
                                        {active_percentage}
                                    </Segment>
                                    <Segment id='segment-2'  >
                                        <h4>Active Cases </h4>
                                        {active_cases}

                                    </Segment>
                                    {/* <Segment id='segment-2'  >
                                        <h4> Active Cases:</h4>
                                        {active_cases}
                                    </Segment> */}

                                    <Segment id='segment-2'  >
                                        <h4>Total Tests:</h4>
                                        {tests}
                                    </Segment>
                                    {/* </Segment.Group> */}
                                </Grid.Column >

                                <Grid.Column className="stat-column-1" width={8}>

                                    <Segment id='segment-table'>
                                        <div className="dropdown-wrapper">
                                            <Dropdown button
                                                className='icon'
                                                floating
                                                labeled text={this.state.value}
                                                options={options}
                                                onChange={this.onChange.bind(this)}>
                                            </Dropdown>
                                        </div>
                                        <Table striped size='medium' className='table-stat' textAlign='center' >
                                            {header}

                                            {body}
                                        </Table>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>


                                <Grid.Column width={8}>
                                    <Segment id='segment-chart'>
                                        <Pie data={data}></Pie>
                                    </Segment>
                                </Grid.Column>

                                <Grid.Column width={8}>
                                    <Segment id='segment-link'>
                                        <Button color='blue' href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public'> Corona Virus Prevention </Button>
                                    </Segment>
                                    <Segment id='segment-link'>
                                        <Button color='blue' href='https://coronavirus.jhu.edu/covid-19-basics/understanding-covid-19'> John Hopkins Uni Resource </Button>
                                    </Segment>
                                    <Segment id='segment-link'>
                                        <Button color='blue' href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports'> World Health Organization </Button>
                                    </Segment>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Segment>

                </div>
            </div>

        </div >);
    }
}

export default Country;