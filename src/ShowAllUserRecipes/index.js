import React from 'react'
import Fade from 'react-reveal/Fade';
import {Card,Image, List, } from 'semantic-ui-react'




export default function ShowAllUserRecipes(props){
 
    const allRecipes = props.userRecipes.map(recipe => {
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === recipe.id){
            return(
                <List.Item id="list-item" key={ingredient.id}>{ingredient.ingredient}</List.Item>
            )
        } else {
            return null
        }
    })
    return(
        <Card color={"yellow"} raised key={recipe.id} onClick={() => {} } id="item-recipe">
            <Image 
                     src={recipe.image}  onClick={ () => props.showSingleUserRecipe(recipe.id)} alt="food pic"/>
            <Card.Content textAlign={"center"} >
                <Card.Header id="card-header">
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
                <List>
                <h5 id="list-item">Ingredients</h5>
                {ingredients}
                </List>
                <h5 id="list-item">Instructions</h5>
                <Card.Description>
                   {recipe.instructions}
                    
                </Card.Description>
            </Card.Content>                    
            </Card>
            
        )
    })
    return(
        <Fade left>
            <h1>My Cookbook</h1>
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
        </Fade>
    )

}