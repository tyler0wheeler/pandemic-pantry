
import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import Fade from 'react-reveal/Fade';



export default function SearchRecipeList(props){
    const allSearchedRecipes = props.searchedRecipes.map(recipe => {

    return(
        <Card raised={true} key={recipe.id} onClick={() => {} } id="item-recipe">
            <Card.Content textAlign={"center"}>
                <Card.Header id="card-header">
                    {recipe.title}
                </Card.Header>
                <Card.Meta>
                Searched ingredients include: {recipe.usedIngredientCount}
                </Card.Meta>
                <Card.Meta>
                   Other ingredients needed: {recipe.missedIngredientCount} 
                   </Card.Meta>
                <Image raised true
                    src={recipe.image} onClick={ () => props.showSingleRecipe(recipe.id)}/>
            </Card.Content>
              
            </Card>
        )
    })
    return(
        <Fade right>
        <h1>Search Results</h1>
        <Button id="back-button-saved-recipe" onClick={() => props.backToSearch()}>Back To Search</Button>
        <Card.Group centered={true}>
            {allSearchedRecipes}
        </Card.Group>
        </Fade>
    )

}