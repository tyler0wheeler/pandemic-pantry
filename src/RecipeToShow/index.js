import React from 'react'

import {Card, Button, Image, List } from 'semantic-ui-react'




export default function RecipeToShow(props){
    console.log(props);
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === props.showSingleRecipe.id){
            return(
                <List.Item key={ingredient.id}>{ingredient.ingredient}</List.Item>
            )
        } else {
            return null
        }
    }) 
    return(
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
                {ingredients}
                </List>
                <Card.Description>
                   {props.showSingleRecipe.instructions}
                    
                </Card.Description>
                <Button onClick={() => props.closeSingleRecipe()}>Back To All Shared Recipes</Button>
            </Card.Content>
            </Card>
        )
    }