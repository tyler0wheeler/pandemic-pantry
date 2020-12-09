import React from 'react'
import { Container, Image } from 'semantic-ui-react'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';


export default function LandingPage(props){
    return(
        <React.Fragment>
        <Container textAlign="center" className="landing-page-container">
            <Fade top>
            <h1 id="landing-page-title">Welcome to the Pandemic Pantry</h1>
            </Fade>
            <Fade bottom>
            <p id="landing-paragraph">Many of us have found comfort in these troubling times in our food.  This site was created to showcase the recipes we have created with often little ingredients on hand.</p>
            </Fade>
            <Zoom>
            <Image className="landing-page-image" src="https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"></Image>
            </Zoom>
            <Fade right>
            <p id="landing-paragraph">Use our Search to find recipes based on the ingredients you have from our friends at Spoonacular or register an account and create your own recipes for yourself or to share with our community!  We can't wait to see what you have been cooking up! </p>
            </Fade>
            </Container>
        </React.Fragment>
    )
}