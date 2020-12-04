import React from 'react'
import {Card, Button, Image, List, Form } from 'semantic-ui-react'


export default function ShowAllRecipes(props){
    const allRecipes = props.allRecipes.map(recipe => {
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === recipe.id){
            return(
              <List.Item key={ingredient.id}>{ingredient.ingredient}</List.Item>
            )
        } else {
            return null
        }
    })
    return(
        <Card color={"yellow"} raised key={recipe.id} onClick={() => {} } id="item-recipe">
            <Image 
                     src={recipe.image}  onClick={ () => props.showSingleRecipe(recipe.id)} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {recipe.title}
                </Card.Header>
                <Card.Meta>
                Created by: {recipe.owner.username}
                </Card.Meta>
                <Card.Meta>
                Ready in {recipe.readyInMinutes} minutes
                </Card.Meta>
                <Card.Meta>
                Serves :{recipe.servings}
                </Card.Meta>
            </Card.Content>                    
            </Card>
            
        )
    })
    return(
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
    )

}