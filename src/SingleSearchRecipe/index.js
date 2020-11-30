import React from 'react'
import { Card, Image, Segment, Button } from 'semantic-ui-react'

export default function SingleSearchRecipe(props){
    return(
        <Segment> 
              <Card>
                <Image 
                    src={props.showThisRecipe.image} alt="90s pic"/>
                <Card.Content>
                    <Card.Header>{props.showThisRecipe.title}</Card.Header>
                    <Card.Meta>
                       Ready in {props.showThisRecipe.readyInMinutes} minutes
                    </Card.Meta>
                    <Card.Meta>
                    Serves :{props.showThisRecipe.servings}
                    </Card.Meta>
                <Card.Description>
                    {props.showThisRecipe.instructions}
                </Card.Description>
                </Card.Content>
                <Button onClick={props.closeShowModal}>Back</Button>
                
            </Card>
        </Segment>
    )

}