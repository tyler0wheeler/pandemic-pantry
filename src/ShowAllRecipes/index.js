import React from 'react'
import Fade from 'react-reveal/Fade';
import {Card,Image, List} from 'semantic-ui-react'


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
                     src={recipe.image} className="show-page-image" onClick={ () => props.showSingleRecipe(recipe.id)} alt="food pic"/>
            <Card.Content textAlign={"center"}>
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
            </Card.Content>                    
            </Card>
           
            
        )
    })
    return(
        <Fade left>
            <h1>Community Cookbook</h1>
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
        </Fade>
    )

}