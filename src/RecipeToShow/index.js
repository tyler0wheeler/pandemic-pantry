import React from 'react'
import Fade from 'react-reveal/Fade';
import {Card, Button, Image, List } from 'semantic-ui-react'




export default function RecipeToShow(props){
    console.log(props);
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === props.showSingleRecipe.id){
            return(
                <List.Item id="list-item" key={ingredient.id}>{ingredient.ingredient}</List.Item>
            )
        } else {
            return null
        }
    }) 
    return(
        <Fade left>
        <Card raised key={props.showSingleRecipe.id} centered={true} id="single-view-card">
            <Image 
                    src={props.showSingleRecipe.image} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {props.showSingleRecipe.title}
                </Card.Header>
                
                <Card.Meta>
                Ready in {props.showSingleRecipe.readyInMinutes} minutes
                </Card.Meta><Card.Meta>
                Serves :{props.showSingleRecipe.servings}
                </Card.Meta>
                <List>
                <h5 id="list-item">Ingredients</h5>
                {ingredients}
                </List>
                <h5 id="list-item">Instructions</h5>
                <Card.Description>
                   {props.showSingleRecipe.instructions}
                    
                </Card.Description>
                <Button id="back-button" onClick={() => props.closeSingleRecipe()}>Back To All Shared Recipes</Button>
            </Card.Content>
            </Card>
            </Fade>
        )
    }