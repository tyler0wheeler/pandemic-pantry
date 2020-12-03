import React from 'react'

import {Card, Button, Image } from 'semantic-ui-react'




export default function RecipeToShowUser(props){
    // const [open, setOpen] = React.useState(false)
    console.log(props);

    // const likes = props.likes.filter(like => like.post.id === post.id)
    return(
        <Card raised key={props.showSingleUserRecipe.id} onClick={() => {} } centered={true}>
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
                <Card.Description>
                   {props.showSingleUserRecipe.instructions}
                    
                </Card.Description>
                <Button onClick={() => props.closeSingleUserRecipe()}>Back To All My Recipes</Button>
                
            </Card.Content>
            </Card>
        )
    }