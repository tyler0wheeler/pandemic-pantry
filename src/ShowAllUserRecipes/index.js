import React from 'react'

import {Icon, Card, Button, Image } from 'semantic-ui-react'




export default function ShowAllUserRecipes(props){
    // const [open, setOpen] = React.useState(false)
    console.log(props);
    const allRecipes = props.userRecipes.map(recipe => {
    // const likes = props.likes.filter(like => like.post.id === post.id)
    return(
        <Card raised key={recipe.id} onClick={() => {} }>
            <Image 
                    src={recipe.image} alt="food pic"/>
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
            </Card>
        )
    })
    return(
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
    )

}