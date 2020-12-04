import React from 'react'

import {Card,Image, List, } from 'semantic-ui-react'




export default function ShowAllUserRecipes(props){
    // const initialInputState = { ingredient: '' }
    // const [eachEntry, setEachEntry] = useState(initialInputState)
    // const { ingredient } = eachEntry
  
    // const handleInputChange = e => {
    // setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
    // }
    // const handleSubmit = (eachEntry, id) => {
    //     props.addIngredient(eachEntry, id)
    //     setEachEntry(initialInputState)
    // } 
   
    const allRecipes = props.userRecipes.map(recipe => {
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
                     src={recipe.image}  onClick={ () => props.showSingleUserRecipe(recipe.id)} alt="food pic"/>
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
                <List>
                {ingredients}
                </List>
                
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