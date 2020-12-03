import React from 'react'
import { Card, Image, Segment, Button, List } from 'semantic-ui-react'

export default function SingleSearchRecipe(props){
    const ingredients = props.showThisRecipe.extendedIngredients.map(ingredient =>{
            return (
                <List.Item>{ingredient.originalString}</List.Item>
            )
    })
    return(
        <Segment> 
              <Card>
                <Image 
                    src={props.showThisRecipe.image} alt="food pic"/>
                <Card.Content>
                    <Card.Header>{props.showThisRecipe.title}</Card.Header>
                    <Card.Meta>
                       Ready in {props.showThisRecipe.readyInMinutes} minutes
                    </Card.Meta>
                    <Card.Meta>
                    Serves :{props.showThisRecipe.servings}
                    
                    </Card.Meta>
                    <List>
                        {ingredients}
                    </List>
                <Card.Description>
                    {props.showThisRecipe.instructions}
                </Card.Description>
                </Card.Content>
                <Button onClick={props.closeShowModal}>Back</Button>
                
            </Card>
        </Segment>
    )

}