
import React, { useRef, useEffect } from 'react';
import { select, geoPath } from "d3";
import d1 from "./data/dataTheodoTravels2015.json";
import "./css/test.css";
import * as topojson from 'topojson'
import * as d3 from 'd3';
import { Link, Redirect } from "react-router-dom";

import { Grid, Table, Icon, Button } from "semantic-ui-react"
import d2 from "./data/data.json";
//function GeoChart(){}
function GeoChart(props) {

    var all_cases;
    var country_cases;

    const country_data = props.data_all;

    const svgRef = useRef();
    const wrapperRef = useRef();

    var countriesValues, mostVisited;
    mostVisited = 0;
    var vals = [];
    countriesValues = d1;
    for (var country in countriesValues) {
        const current = parseInt(countriesValues[country])
        vals.push(current)
        if (mostVisited < current) {
            mostVisited = current;
        }
    }


    const locations = {}

    const world = d2;
    const data = world.objects.countries.geometries;
    for (var i = 0; i < data.length; i++) {
        const name = data[i].properties.name;
        locations[name] = data[i].properties.location;
    }





    var locations2 = []


    for (var i = 0; i < data.length; i++) {
        locations2.push(data[i].properties.location)
    }


    var countries = topojson.feature(world, world.objects.countries);

    // We group the countries in contients (We removed Antarctica and we put oceania with Asia)
    var asia = { type: "FeatureCollection", name: "Asia and Oceania", id: 1, features: countries.features.filter(function (d) { return d.properties.continent == "Asia and Oceania"; }) };
    var africa = { type: "FeatureCollection", name: "Africa", id: 2, features: countries.features.filter(function (d) { return d.properties.continent == "Africa"; }) };
    var europe = { type: "FeatureCollection", name: "Europe", id: 3, features: countries.features.filter(function (d) { return d.properties.continent == "Europe"; }) };
    var na = { type: "FeatureCollection", name: "North America", id: 4, features: countries.features.filter(function (d) { return d.properties.continent == "North America"; }) };
    var sa = { type: "FeatureCollection", name: "South America", id: 5, features: countries.features.filter(function (d) { return d.properties.continent == "South America"; }) };

    var continents = [asia, africa, europe, na, sa];
    var changeFocus, previousTransformation, worldScaleFactor, worldmapBBox, worldmapBBoxOffsetX, worldmapBBoxOffsetY, translateX, translateY;
    // There are 3 levels of zoom: "world, continent and country"
    var current = '';
    var worldDefaultTransformation = undefined;
    var c = "/info/World";



    useEffect(() => {
        if (props.data_all["USA"] != undefined) {

            const svg = select(svgRef.current)
                .attr("width", "100%")
                .attr("height", "100%");

            // const { width, height } =
            //     dimensions || wrapperRef.current.getBoundingClientRect();
            var
                container = document.getElementById("map-container"),
                width = container.clientWidth,
                height = container.clientHeight;
            var projection = d3.geoNaturalEarth1();
            const path = geoPath().projection(projection);

            // const group = svg;
            var group = svg.append("g")
                .attr("width", "100%")
                .attr("height", "100%")
            var selectedCountry;

            const fitWorld = function () {
                if (worldDefaultTransformation == undefined) {
                    group.attr("transform", function () {
                        worldmapBBox = this.getBBox();
                        worldScaleFactor = Math.min(height / worldmapBBox.height, width / worldmapBBox.width);
                        worldmapBBoxOffsetX = 0.5 * width - worldScaleFactor * (worldmapBBox.x + 0.5 * worldmapBBox.width);
                        worldmapBBoxOffsetY = 0.5 * height - worldScaleFactor * (worldmapBBox.y + 0.5 * worldmapBBox.height);
                        worldDefaultTransformation = "translate(" + worldmapBBoxOffsetX + "," + worldmapBBoxOffsetY + ") scale(" + worldScaleFactor + ")";
                        return worldDefaultTransformation;
                    });
                } else {
                    group.transition().attr("transform", worldDefaultTransformation);
                }
            };

            const zoomContinentToWorld = function () {
                focusLevel = "world";
                group.selectAll(".continent").transition().duration(200).attr("transform", "")
                    .on("end", function (d) {
                        group.selectAll(".continent").attr("class", function (d) {
                            return 'continent';
                        });
                    });
            };



            const zoomContinentToCountry = function (clickedCountry) {
                focusLevel = "country";
                selectedCountry = clickedCountry;
                c = clickedCountry.properties.name;
                group.selectAll(".country").filter(function (d) {
                    if (d !== clickedCountry) {
                        return d;
                    }
                }).attr("class", "country faded");
                previousTransformation = group.select(".continent.focused").attr("transform");
                group.selectAll(".continent").transition().duration(300).attr("transform", "");
                return group.selectAll(".country").filter(function (d) {
                    if (d === clickedCountry) {
                        return d;
                    }
                }).attr("class", function (d) {
                    return 'country focused';
                }).transition().duration(600).attr("transform", function () {
                    var bBox, miniCountryOffsetX, miniCountryOffsetY, miniCountryScale, targetSize;
                    bBox = this.getBBox();
                    targetSize = Math.min(width / 1.3, height / 1.3);
                    miniCountryScale = Math.min(targetSize / bBox.width, targetSize / bBox.height);
                    miniCountryOffsetX = -bBox.x * miniCountryScale + 40;
                    miniCountryOffsetY = -bBox.y * miniCountryScale + 40;
                    return "translate(" + miniCountryOffsetX + "," + miniCountryOffsetY + ") scale(" + miniCountryScale + ")";
                }).on("end", function () {
                    document.getElementById("country-details").className = "";
                    document.getElementById("description").className = "";
                    document.getElementById("legend1").className = "faded"
                    document.getElementById("map-country-header").textContent = "More Info on " + clickedCountry.properties.name;
                    document.getElementById("map-country-header").href = 'https://covid19-informatics.herokuapp.com/info/' + clickedCountry.properties.name;

                    document.getElementById("table-header").textContent = clickedCountry.properties.name;
                    try {


                        document.getElementById("table-deaths").textContent = country_data[clickedCountry.properties.name]['deaths'];
                        document.getElementById("table-recovered").textContent = country_data[clickedCountry.properties.name]['recovered'];
                        document.getElementById("table-cases").textContent = country_data[clickedCountry.properties.name]['cases'];
                    } catch (err) {

                        document.getElementById("map-country-header").textContent = "No Info on " + clickedCountry.properties.name;
                        document.getElementById("map-country-header").href = '/';

                        document.getElementById("table-deaths").textContent = "no info";
                        document.getElementById("table-recovered").textContent = "no info";
                        document.getElementById("table-cases").textContent = "no info";

                    }
                    document.getElementById("country-name").textContent =
                        clickedCountry.properties.name + ' ' + country_data[clickedCountry.properties.name]['cases'];

                });
            };

            const zoomCountryToContinent = function () {
                // document.getElementById("svg").className = "";
                document.getElementById("legend1").className = ""
                document.getElementById("country-details").className = "faded";
                document.getElementById("description").className = "faded";
                focusLevel = "continent";
                group.selectAll(".country").attr("class", function (d) {
                    return 'country';
                });
                group.selectAll(".country").filter(function (d) {
                    if (d === selectedCountry) {
                        return d;
                    }
                }).transition().attr("transform", "");
                group.select(".continent.focused").transition().delay(50).duration(200).attr("transform", previousTransformation);
            };

            const zoomWorldToContinent = function (clickedCountry) {
                group.transition().attr("transform", "");
                translateX = null;
                translateY = null;
                focusLevel = "continent";
                continent = clickedCountry.properties.continent;
                group.selectAll(".continent").filter(function (d) {
                    if (d.name !== continent) {
                        return d;
                    }
                }).attr("class", function () {
                    return this.className.animVal + " unfocused";
                });
                group.selectAll(".continent").filter(function (d) {
                    if (d.name === continent) {
                        return d;
                    }
                }).attr("class", "continent focused").transition().duration(400).attr("transform", function () {
                    var bBox, scaleFactor;
                    bBox = this.getBBox();
                    scaleFactor = Math.min(width / bBox.width, height / bBox.height);
                    translateX = 0.5 * width - scaleFactor * (bBox.x + 0.5 * bBox.width);
                    translateY = 0.5 * height - scaleFactor * (bBox.y + 0.5 * bBox.height);
                    return "translate(" + translateX + "," + translateY + ") scale(" + scaleFactor + ")";
                });
                group.selectAll(".country").attr("class", function (d) {
                    return 'country';
                });
            };

            var focusLevel = "world";

            const changeFocus = function (clickedCountry) {
                if (clickedCountry != null) {
                    if (focusLevel == "world") {
                        zoomWorldToContinent(clickedCountry);
                    } else if (focusLevel == "continent") {
                        zoomContinentToCountry(clickedCountry);
                    }
                } else if (clickedCountry == null) {
                    if (focusLevel == "country") {
                        zoomCountryToContinent();
                    } else if (focusLevel == "continent") {
                        fitWorld();
                        zoomContinentToWorld();
                    }
                }
            };

            const baseValue = 120;
            const remainder = 255 - baseValue;

            const colorScheme = d3.interpolatePuBu;
            const colorScale = d3.scaleSqrt().domain([0, Math.log10(country_data['casesMax'])]);



            const tooltip = function (country, c) {


                // console.log("clicked")
            }





            //!!!!!
            // We draw the continents here
            //!!!!!

            const mouseAction = function (clickedCountry) {
                if (focusLevel != 'country') {
                    document.getElementById("map-country-header").textContent = clickedCountry.properties.name
                }
            }
            group.selectAll(".continent").data(continents).enter().call(function (d) {
                return d.append("g").attr('class', function (d) {
                    return 'continent ' + d.name.replace(' ', '');
                }).selectAll(".country").data(function (d) {
                    return d.features;
                }).enter().insert("path").attr("class", "country")
                    .attr("fill", function (d) {

                        try {
                            const country = country_data[d.properties.name];

                            const value = Math.log10(country['cases']);
                            return colorScheme(colorScale(value));

                        }
                        catch (err) {

                            return "rgb(211, 211, 211)";

                        }

                    }).attr("d", path).attr("id", function (d) {
                        return d.id;
                    }).attr("stroke", "white")
                    .attr("stroke-width", 0.6)
                    .on("mouseover", function (d) {
                        mouseAction(d);
                        return tooltip(d.properties.name, d3.geoCentroid(d))
                    })
                    .on("click", function (d) {
                        changeFocus(d);
                        d3.event.stopPropagation();
                    });
            });

            // We here draw some attributes of continents, here we simply display the name
            var continent, continentBBox, i, len;
            for (i = 0, len = continents.length; i < len; i++) {
                continent = continents[i];
                continentBBox = null;
                group.selectAll(".continent").filter(function (d) {
                    if (d.name === continent.name) {
                        continentBBox = this.getBBox();
                        return d;
                    }
                }).append("text").attr("class", "continent-name").text(function (d) {
                    return d.name;
                }).attr("transform", function () {
                    var textOffsetX, textOffsetY;
                    textOffsetX = continentBBox.x + continentBBox.width / 2;
                    textOffsetY = continentBBox.y + continentBBox.height / 2;
                    return "translate(" + textOffsetX + "," + textOffsetY + ")";
                });
            }

            // We catch the click
            d3.select("body").on("click", function () {
                changeFocus();
                d3.event.stopPropagation();
            });

            // We scale the map to fit the #map-container div
            fitWorld();


            var w = 20, h = 300;

            var key = d3.select("#legend1")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

            var legend = key.append("defs")
                .append("svg:linearGradient")
                .attr("id", "gradient")
                .attr("x1", "0%")
                .attr("y1", "100%")
                .attr("x2", "100%")
                .attr("y2", "100%")
                .attr("spreadMethod", "pad");

            legend.append("stop")
                .attr("offset", "0%")
                .attr("stop-color", "#f7fcf0")
                .attr("stop-opacity", 1);

            legend.append("stop")
                .attr("offset", "33%")
                .attr("stop-color", "#7fdae1")
                .attr("stop-opacity", 1);

            legend.append("stop")
                .attr("offset", "66%")
                .attr("stop-color", "#7bccc4")
                .attr("stop-opacity", 1);

            legend.append("stop")
                .attr("offset", "100%")
                .attr("stop-color", "#084081")
                .attr("stop-opacity", 1);

            key.append("rect")
                .attr("width", h)
                .attr("height", w)
                .style("fill", "url(#gradient)")
                .attr("transform", "translate(0,10)")
                .attr("transform", "rotate(90)");

            var y = d3.scaleLinear()
                .range([300, 0])
                .domain([country_data['casesMax'], 0]);

            var yAxis = d3.axisBottom()
                .scale(y)
                .ticks(5);

            key.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(0,10)")
                .attr("transform", "rotate(90)")
                .call(yAxis)
                .append("text")
                .attr("y", 0)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("axis title");
        }




    }, [props.data_all]);




    return (

        <Grid centered>
            <Grid.Row id='tool' textAlign="center">
                <Button size='huge' basic color="blue" id="map-country-header"> World </Button>
            </Grid.Row>

            <div id="map-container" ref={wrapperRef} >
                <Grid.Row >
                    <svg id='svg' ref={svgRef}>

                    </svg>

                    <div id="legend1" className=""></div>

                </Grid.Row>
                <Grid.Row>
                    <div id='country-details'>
                        <div id='description' className='faded'>
                            <Table className='country-table' textAlign="center" color='black' celled striped>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell className='table-cell' id='table-header' colSpan='3'>Git Repository</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell className='table-cell' collapsing>
                                            <Icon name='arrow circle up' /> Total Cases</Table.Cell>
                                        <Table.Cell className='table-cell' id='table-cases'></Table.Cell>

                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className='table-cell'>
                                            <Icon color='green' name='arrow circle down' /> Recovered </Table.Cell>
                                        <Table.Cell className='table-cell' id='table-recovered'></Table.Cell>

                                    </Table.Row>
                                    <Table.Row>
                                        <Table.Cell className='table-cell'>
                                            <Icon color="red" name='plus square' /> Deaths </Table.Cell>
                                        <Table.Cell className='table-cell' id='table-deaths'></Table.Cell>
                                    </Table.Row>
                                </Table.Body>

                            </Table>
                        </div>
                    </div>

                </Grid.Row>

            </div>
        </Grid >);



}



export default GeoChart