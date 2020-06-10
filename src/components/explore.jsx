import React, { Component } from 'react';

import { Grid, Message } from 'semantic-ui-react';
import Navigation from "./navigation"
import "./css/simulation.css";

import Agent1 from "./simulations/Agent-0.5-7-1.9.mp4";
import Agent2 from "./simulations/Agent-0.5-14-1.9.mp4"
import Agent3 from "./simulations/Agent-0.25-7-1.9.mp4"
import Agent4 from "./simulations/Agent-0.5-7-1.2.mp4"

import Sir1 from "./simulations/SIR-0.5-7-1.9.png"
import Sir2 from "./simulations/SIR-0.5-14-1.9.png"
import Sir3 from "./simulations/SIR-0.25-7-1.9.png"
import Sir4 from "./simulations/SIR-0.5-7-1.2.png"


class Explore extends Component {




    constructor(props) {
        super(props);
        this.state = {}




    }



    render() {

        const message = (
            <p>I want to begin with a disclaimer that these simulations are not entirely accurate
            representation of real life pandemics. No model of the pandemic is 100% accurate, but some
            are useful to better understand the pandemic. The purpose of the simulations below is to see
            how certain paramaters such as social distancing, hygiene, masks, etc. have an impact on the
            spread of disease. Again, by no means is this an accurate representation of pandemic spread. These
            results are only a simulation under controlled parameters. Yet useful insight is provided, and
            results closely align with real life events. If anyone is interested for the code behind the simulations,
            feel free to check it out at this <a href="#"> repo </a></p>)

        return (

            <div>
                <Navigation />
                <Grid stackable centered>
                    <Grid.Row>
                        <h2> Understanding Pandemic Spread </h2>
                    </Grid.Row>

                    <Grid.Row>
                        <Message
                            size="large"
                            className="disclaimer"
                            icon='chart bar'
                            header='Explaining Simulations'
                            content={message}
                        />
                    </Grid.Row>

                    <Grid.Row centered columns={4}>
                        <Grid.Column textAlign='center'>
                            <h2> Susceptible </h2>
                            <span id='dot' className="dot1"></span>
                        </Grid.Column>

                        <Grid.Column textAlign='center'>
                            <h2> Infected </h2>
                            <span id='dot' className="dot2"></span>
                        </Grid.Column>

                        <Grid.Column textAlign='center'>
                            <h2> Recovered </h2>
                            <span id='dot' className="dot3"></span>
                        </Grid.Column>

                        <Grid.Column textAlign='center'>
                            <h2> Deceased </h2>
                            <span id='dot' className="dot4"></span>
                        </Grid.Column>

                    </Grid.Row>

                </Grid>


                <div className='grid-wrappper'>

                    <Grid stackable className="grid-video" >
                        <Grid.Row textAlign="right">
                            <h2 className="simulation-header"> Our base model </h2>
                            <p textAlign="left"> This is the basic model of disease spread. The red curve represents
                            the infected, blue represents the susceptible, green is recovered, grey is deceased.
                            Important things to notice is that the red infection curve has a peak were the
                            maximum number of infections occur. Succeeding to overcome or control a pandemic
                            heavily depends on flattening that curve. Another important factor to notice is the length
                            of each simulation. Each simulation stops whenever the disease is eradicated, and different
                            control methods will lead to various eradication periods. All the following simulations
                            are relative to this base model.</p>
                            <p> Here are the some quantifiying numbers. Due to the varying nature of the actual
                            covid parameter, I have decided to randomly choose the base Infection Rate.
                                </p>

                            <ul>
                                <li> Infection Rate: 50%. </li>
                                <li> Infection Radius: 2 meters</li>
                                <li> Speed of Particles: 2 m/s</li>
                                <li> Number of Citizens: 160</li>
                            </ul>

                        </Grid.Row>


                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Grid.Row>
                                    <h2> Simulation </h2>
                                </Grid.Row>
                                <Grid.Row>

                                    <div className="video-left">
                                        <video autoPlay loop controls >
                                            <source src="https://drive.google.com/file/d/1f655QFOgVark2AbihVUsHswWR0AmKzTk/view?usp=sharing" type="video/mp4" />
                                        </video>
                                    </div>
                                </Grid.Row>


                            </Grid.Column>

                            <Grid.Column >

                                <Grid.Row>
                                    <h2> SIR Model </h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <div className="video-right">
                                        <img className="sir" src={Sir1}></img>
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>

                </div>

                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}

                <div className='grid-wrappper'>

                    <Grid stackable className="grid-video" >
                        <Grid.Row textAlign="right">
                            <h2 className="simulation-header"> Doubling the Infection Radius </h2>

                            <p > The infection radius is minimum distance you have to keep from an infected
                            person in order not to catch the disease. Since Covid-19 could be transmitted through air, this is an
                            important factor to study. In this simulation I doubled the infection radius to 4 meters. Looking at the SIR Model,
                            the peak of the curve almost doubles, and every susceptible person gets infected. Another thing to notice
                            is that the disease is eradicated in half the time of our base model. Also,
                            the number of deaths due to the disease is almost identical to our base model.
                            This simulation shows why it is extremely
                            important to wear masks, as it can have a high impact on flattening the curve. Masks reduce the spread of
                            airborne particles, hence reducing the radius of infection.
                             </p>



                        </Grid.Row>

                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Grid.Row>
                                    <h2> Simulation </h2>
                                </Grid.Row>
                                <Grid.Row>

                                    <div className="video-left">
                                        <video autoPlay loop controls >
                                            <source src={Agent2} type="video/mp4" />
                                        </video>
                                    </div>
                                </Grid.Row>


                            </Grid.Column>

                            <Grid.Column >

                                <Grid.Row>
                                    <h2> SIR Model </h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <div className="video-right">
                                        <img className="sir" src={Sir2}></img>
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>

                </div>


                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}

                <div className='grid-wrappper'>

                    <Grid stackable className="grid-video" >
                        <Grid.Row textAlign="right">
                            <h2 className="simulation-header"> Reducing the Infection Rate by 50% </h2>
                            <p textAlign="left"> The infection rate refers to the likelihood  that you'll catch the disease
                            by coming in contact with an infected person. In this simulation we reduced the infection rate to 25%.
                            In real life, reducing the infection rate is very correlated with personal hygiene. Constantly washing your
                            hands, keeping your household clean, not touching your face, etc. are all examples of how you reduce the probability
                            of you catching a disease if you come into contact with it. The results are quite remarkable. The curve peaks at 38 infections
                            compared to 74 in the base model, about half the peak. The duration of the disease lasts 1.7 times more than our
                            base model. In conclusion, the infection rate successfully flattens the curve at the expense of extending the duration
                            of the disease. </p>

                        </Grid.Row>

                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Grid.Row>
                                    <h2> Simulation </h2>
                                </Grid.Row>
                                <Grid.Row>

                                    <div className="video-left">
                                        <video autoPlay loop controls >
                                            <source src={Agent3} type="video/mp4" />
                                        </video>
                                    </div>
                                </Grid.Row>


                            </Grid.Column>

                            <Grid.Column >

                                <Grid.Row>
                                    <h2> SIR Model </h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <div className="video-right">
                                        <img className="sir" src={Sir3}></img>
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>

                </div>


                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}

                <div className='grid-wrappper'>

                    <Grid stackable className="grid-video" >
                        <Grid.Row textAlign="right">
                            <h2 className="simulation-header">  Reducing the Speed of Movement by 35% </h2>
                            <p textAlign="left"> This was the most surpising result. I reduced the speed of movement from 2m/s to 1.3m/s.
                            In very loose terms, this sort of mimics the social distancing. Ideally, to ensure that no contact occurs between
                            people, no one would move at all. Reducing the speed of movement reduces the amount of people you contact per day,
                            hence in some sense, it mimicks what social distancing. I may be completely wrong, but the results are too good to ignore.
                            Looking at the SIR model, the curve peaks at 30 infections, which is 60% less than the base model peak. The time for the disease
                            to eradicate 110% of the the base model time, which is very close. Another important result is the number of deaths. The base model
                            had 17 deaths out of 160. This simulation had 6 deaths out of 160, which is 65% less deaths than the base model.
                            Reducing the speed of movement is by far the most effective control parameter in this experiment. It has the lowest peak,
                            lowest numbers of deaths, and a relatively short timeline for the disease eradication. Moral of the story, stat at home and reduce
                            contact with others as much as possible (until Covid is over).
                             </p>

                        </Grid.Row>

                        <Grid.Row columns={2}>
                            <Grid.Column >
                                <Grid.Row>
                                    <h2> Simulation </h2>
                                </Grid.Row>
                                <Grid.Row>

                                    <div className="video-left">
                                        <video autoPlay loop controls >
                                            <source src={Agent4} type="video/mp4" />
                                        </video>
                                    </div>
                                </Grid.Row>


                            </Grid.Column>

                            <Grid.Column >

                                <Grid.Row>
                                    <h2> SIR Model </h2>
                                </Grid.Row>
                                <Grid.Row>
                                    <div className="video-right">
                                        <img className="sir" src={Sir4}></img>
                                    </div>
                                </Grid.Row>
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>

                </div>


                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}
                {/*  ---------------------------------------------------------*/}




            </div >



        );
    }
}

export default Explore;