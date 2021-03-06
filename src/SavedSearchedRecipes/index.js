import React from 'react'
import Fade from 'react-reveal/Fade';
import {Card, Image, List, Button } from 'semantic-ui-react'




export default function SavedSearchedRecipes(props){
     
    // console.log("These are the props", props);
    const allRecipes = props.savedRecipes.map(recipe => {
    // console.log(recipe.ingredients);
    // const turnToString = recipe.ingredients.toString()
    // const removeCharacter = (turnToString).slice(0 ,-1);
    // const sliceFirst = removeCharacter.slice(1)
    // const newArr = sliceFirst.toString().split(',')
    // console.log(newArr);
    // const ingredients = newArr.map(ingredient=> {
    //     const firstCharacter = ingredient.slice(0, -1)
    //     const lastCharacter = firstCharacter.slice(1)
    //     return(
    //         <List.Item id="list-item">{lastCharacter}</List.Item>
    //     )
    // })    
    return(
        <Card  raised key={recipe.id} id="item-recipe" onClick={() => props.showSingleRecipe(recipe.id)}>
            <Image 
                     src={recipe.image} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header id="card-header">
                    {recipe.title}
                </Card.Header>
                <Card.Meta>
                Ready in {recipe.readyInMinutes} minutes
                </Card.Meta>
                <Card.Meta>
                Serves :{recipe.servings}
                </Card.Meta>
                <List>
                <h5 id="list-item">Ingredients</h5>
                <List.Item id="list-item">{recipe.ingredients}</List.Item>

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
            <h1>My Saved Recipes</h1>
            <Button id="back-button-saved-recipe" onClick={() => props.backToSearch()}>Back to Search</Button>
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
        </Fade>
    )

}