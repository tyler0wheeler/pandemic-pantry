
import React from 'react'
import {Icon, Card, Button, Image } from 'semantic-ui-react'




export default function SearchRecipeList(props){
    const allSearchedRecipes = props.searchedRecipes.map(recipe => {
    // console.log(allPosts);
    // const likes = props.likes.filter(like => like.post.id === post.id)
    // console.log(likes);
    // console.log(props.loggedInUser);
    // const likedUser = props.likes.filter(like => like.user.username === props.loggedInUser )
    // const likedUser = likes.filter(like => like.user.username === props.loggedInUser);
    // console.log(likedUser);
    
    return(
        <Card raised key={recipe.id} onClick={() => {} } medium circular>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {recipe.title}
                </Card.Header>
                <Card.Description>
                   Searched ingredients include: {recipe.usedIngredientCount}

                   Other ingredients needed: {recipe.missedIngredientCount} 
                </Card.Description>
                <Image raised true
                    src={recipe.image} onClick={ () => props.showSingleRecipe(recipe.id)}/>
            </Card.Content>
              
            </Card>
        )
    })
    return(
        <Card.Group centered={true}>
            {allSearchedRecipes}
        </Card.Group>
    )

}