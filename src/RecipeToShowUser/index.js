import React from 'react'

import {Card, Button, Image, List } from 'semantic-ui-react'




export default function RecipeToShowUser(props){
    // const [open, setOpen] = React.useState(false)
    console.log(props);
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === props.showSingleUserRecipe.id){
            return(
                <List.Item key={ingredient.id}>{ingredient.ingredient}</List.Item>
            )
        } else {
            return null
        }
    }) 
    // const likes = props.likes.filter(like => like.post.id === post.id)
    return(
        <Card raised key={props.showSingleUserRecipe.id} centered={true} id="single-view-card">
            <Image 
                    src={props.showSingleUserRecipe.image} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {props.showSingleUserRecipe.title}
                </Card.Header>
                
                <Card.Meta>
                Ready in {props.showSingleUserRecipe.readyInMinutes} minutes
                </Card.Meta><Card.Meta>
                Serves :{props.showSingleUserRecipe.servings}
                </Card.Meta>
                <List>
                {ingredients}
                </List>
                <Card.Description>
                   {props.showSingleUserRecipe.instructions}
                    
                </Card.Description>
                <Button onClick={() => props.closeSingleUserRecipe()}>Back To All My Recipes</Button>
                <Button 
                    basic color={"red"}
                    onClick={() => props.deleteMyRecipe(props.showSingleUserRecipe.id)}>Delete</Button>
            </Card.Content>
            </Card>
        )
    }