import React, { Component } from 'react';
import { Dropdown, Table } from "semantic-ui-react"
import axios from 'axios';
import "./css/countries.css";
import Navigation from "./navigation";
import _ from 'lodash'
import { Link } from "react-router-dom";




const options = [
    { text: 'Overall Statistics', value: 'Overall' },
    { text: 'Today Statistics', value: 'Today' },
    { text: 'Per Million Statistics', value: 'Per Million' },
]
class Countries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            column: null,
            direction: null,
            value: "Overall",
            option: "Overall Statistics",
        }
    }
    componentDidMount() {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        axios
            .get("http://127.0.0.1:8000/api/get/countries/",
                config)
            .then(res => {
                const datum = res.data
                this.setState({ data: datum })
            })
            .catch(err => {
                console.log("error")
            });

    }
    handleSort = (clickedColumn) => () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(data, [clickedColumn]),
                direction: 'descending',
            })

            return
        }
        this.setState({
            data: data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }

    onChange(e, data) {
        this.setState({ value: data.value, option: data.text });
    }




    render() {
        const { column, data, direction, value } = this.state


        const elements = [];
        const million_stats = [];
        const today_stats = []
        const table_header = [];
        const table_body = [];

        const header1 = (
            <Table.Header className="table-head">
                <Table.Row className="table-row">
                    <Table.HeaderCell sorted={column === 'country' ? direction : null}
                        onClick={this.handleSort('country')} width={3} >Country</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'cases' ? direction : null}
                        onClick={this.handleSort('cases')}
                        width={3}> Cases</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'active' ? direction : null}
                        onClick={this.handleSort('active')}
                        width={3}> Active Cases</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'recovered' ? direction : null}
                        onClick={this.handleSort('recovered')}
                        width={3}> Recoveries</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'deaths' ? direction : null}
                        onClick={this.handleSort('deaths')} width={3}> Deaths</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

        );

        const header2 = (
            <Table.Header className="table-head">
                <Table.Row className="table-row">
                    <Table.HeaderCell sorted={column === 'country' ? direction : null}
                        onClick={this.handleSort('country')} width={3} >Country</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'cases' ? direction : null}
                        onClick={this.handleSort('cases')}
                        width={3}> Cases</Table.HeaderCell>

                    <Table.HeaderCell sorted={column === 'deaths' ? direction : null}
                        onClick={this.handleSort('deaths')}
                        width={3}> Recoveries</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'Tests' ? direction : null}
                        onClick={this.handleSort('Tests')} width={3}> Deaths</Table.HeaderCell>
                </Table.Row>
            </Table.Header >

        );
        const header3 = (
            <Table.Header className="table-head">
                <Table.Row className="table-row">
                    <Table.HeaderCell sorted={column === 'country' ? direction : null}
                        onClick={this.handleSort('country')} width={3} >Country</Table.HeaderCell>
                    <Table.HeaderCell sorted={column === 'cases' ? direction : null}
                        onClick={this.handleSort('cases')}
                        width={3}> Cases</Table.HeaderCell>

                    <Table.HeaderCell sorted={column === 'deaths' ? direction : null}
                        onClick={this.handleSort('deaths')}
                        width={3}> Recoveries</Table.HeaderCell>

                </Table.Row>
            </Table.Header >

        );
        for (var i = 0; i < data.length; i++) {
            const perMillion = (
                <Table.Row className="table-row">

                    <Table.Cell textAlign="center" id='row-1' width={3}><Link to={'/info/' + data[i]['country']}> {data[i]['country']}</Link> </Table.Cell>
                    <Table.Cell textAlign="center" id='row-2' width={3}>{data[i]['casesPerOneMillion']}</Table.Cell>
                    <Table.Cell textAlign="center" id='row-3' width={3}>{data[i]['deathsPerOneMillion']}</Table.Cell>
                    <Table.Cell textAlign="center" id='row-4' width={3}> {data[i]['testsPerOneMillion']}</Table.Cell>
                </Table.Row >

            )
            const today = (
                <Table.Row className="table-row">
                    <Table.Cell textAlign="center" id='row-1' width={3}> <Link to={'/info/' + data[i]['country']}> {data[i]['country']}</Link>  </Table.Cell>
                    <Table.Cell textAlign="center" id='row-2' width={3}>{data[i]['todayCases']}</Table.Cell>
                    <Table.Cell textAlign="center" id='row-3' width={3}>{data[i]['todayDeaths']}</Table.Cell>
                </Table.Row >

            )
            const el = (
                <Table.Row className="table-row">
                    <Table.Cell textAlign="center" id='row-1' width={3}> <Link to={'/info/' + data[i]['country']}> {data[i]['country']}</Link>  </Table.Cell>
                    <Table.Cell textAlign="center" id='row-2' width={3}>{data[i]['cases']}</Table.Cell>
                    <Table.Cell textAlign="center" id='row-3' width={3}>{data[i]['active']}</Table.Cell>
                    <Table.Cell textAlign="center" id='row-4' width={3}> {data[i]['recovered']}</Table.Cell>
                    <Table.Cell textAlign="center" id='row-5' width={3}>{data[i]['deaths']}</Table.Cell>
                </Table.Row >
            )
            elements.push(el);
            million_stats.push(perMillion);
            today_stats.push(today);
        }

        if (value == "Overall") {
            table_header.push(header1);
            table_body.push(elements);
        } else if (value == "Per Million") {
            table_header.push(header2);
            table_body.push(million_stats);
        } else {
            table_header.push(header3);
            table_body.push(today_stats);
        }




        return (<div>
            <Navigation>

            </Navigation>

            <div className="dropdown-wrapper">
                <Dropdown button
                    className='icon'
                    floating
                    labeled text={this.state.value}
                    options={options}
                    onChange={this.onChange.bind(this)}>
                </Dropdown>
            </div>




            <div className="table-wrapper">


                <Table striped singleLine  >
                    {table_header}
                    <Table.Body className="table-body">


                        {table_body}




                    </Table.Body>

                </Table>

            </div>



        </div>);
    }
}

export default Countries;