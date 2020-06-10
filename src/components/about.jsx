import React, { Component } from 'react';
import "./css/about.css";
import { Message, Button } from 'semantic-ui-react'

import Navigation from "./navigation";

class About extends Component {
    state = {}
    render() {
        const email = 'amean.asad@queensu.ca'


        const contribute = (
            <div className='contribute'>
                <h3> Contact developer at: <a href={"mailto:" + email}>amean.asad@queensu.ca  </a></h3>
                <p> Feel free to reach out to share ideas, report issues, or to add to this project. </p>
                <div>
                    <Button href='https://github.com/AmeanAsad/Covid-19-Tracker' color='black' icon='github' > Github Repo</Button>
                </div>
            </div>
        )


        return (
            <div>


                <Navigation>
                </Navigation>
                <div className="wrapper">

                    <div className="message">

                        <Message
                            size="huge"
                            className="about-message"
                            icon='map marker'
                            header='About this project'
                            content='This project is meant to elegantly present information and statistics
                        regarding Covid19 on a world-wide scale.
                        Hopefully there will be more edits to update the project to add more details.'
                        />
                    </div>

                    <div className="message">
                        <Message
                            size="huge"

                            className="about-message"
                            icon='handshake'
                            header='Contribute'
                            content={contribute}
                        />
                    </div>

                    <div className="message">
                        <Message
                            size="huge"

                            className="about-message"
                            icon='chart bar'
                            header='About the data'
                            content='The data provided is from taken from the John Hopkins University Resource Center.
                        Note that this data changes rapidly, therefore the numbers represented are not in real
                        time but are constrained by the accuracy of the source.'
                        />
                    </div>
                    <div className="message">


                        <Message size='huge' className="about-message">
                            <Message.Header className="message-header">Future Plans</Message.Header>
                            <Message.List>
                                <Message.Item>Add a city/province/state statistics for countries</Message.Item>
                                <Message.Item>Add news updates for countries</Message.Item>
                                <Message.Item>Add trend line for each country</Message.Item>
                            </Message.List>
                        </Message>
                    </div>




                </div>

            </div>);
    }
}

export default About;