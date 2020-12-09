import React from 'react'
import Fade from 'react-reveal/Fade';
import {Card, Button, Image, List } from 'semantic-ui-react'




export default function RecipeToShowSavedRecipe(props){
    return(
        <Fade left>
        <Card raised key={props.showSingleRecipe.id} centered={true} id="single-view-card">
            <Image 
                    src={props.showSingleRecipe.image} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header id="card-header">
                    {props.showSingleRecipe.title}
                </Card.Header>
                
                <Card.Meta>
                Ready in {props.showSingleRecipe.readyInMinutes} minutes
                </Card.Meta><Card.Meta>
                Serves :{props.showSingleRecipe.servings}
                </Card.Meta>
                <List>
                <h5 id="list-item">Ingredients</h5>
                <List.Item id="list-item">{props.showSingleRecipe.ingredients}</List.Item>
                </List>
                <h5 id="list-item">Instructions</h5>
                <Card.Description>
                   {props.showSingleRecipe.instructions}
                    
                </Card.Description>
                <Button
                className="delete-modal-open-button"
                size={"small"} 
                onClick={() => props.deleteSavedRecipe(props.showSingleRecipe.id, props.closeSingleRecipe())}>Delete</Button>
                <Button id="back-button" onClick={() => props.closeSingleRecipe()}>Back To All Saved Recipes</Button>
            </Card.Content>
            </Card>
            </Fade>
        )
    }