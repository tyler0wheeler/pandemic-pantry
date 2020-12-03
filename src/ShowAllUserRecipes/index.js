import React from 'react'

import {Card, Button, Image } from 'semantic-ui-react'




export default function ShowAllUserRecipes(props){
    // const [open, setOpen] = React.useState(false)
    console.log(props);
    const allRecipes = props.userRecipes.map(recipe => {
    // const likes = props.likes.filter(like => like.post.id === post.id)
    return(
        <Card raised key={recipe.id} onClick={() => {} }>
            <Image 
                    src={recipe.image} onClick={ () => props.showSingleUserRecipe(recipe.id)} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {recipe.title}
                </Card.Header>
                <Card.Meta>
                Created by: {recipe.owner.username}
                </Card.Meta>
                <Card.Meta>
                Ready in {recipe.readyInMinutes} minutes
                </Card.Meta><Card.Meta>
                Serves :{recipe.servings}
                </Card.Meta>
                <Card.Description>
                   {recipe.instructions}
                    
                </Card.Description>
            </Card.Content>
            <Button 
                    basic color={"red"}
                    onClick={() => props.deleteMyRecipe(recipe.id)}>Delete</Button>
                <Button
                    basic color={"yellow"}
                    onClick={() => props.editMyRecipe(recipe.id)}>Edit</Button>
            </Card>
        )
    })
    return(
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
    )

}