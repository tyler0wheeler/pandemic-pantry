import React, { useState } from 'react'

import {Card, Button, Image, List, Form } from 'semantic-ui-react'




export default function RecipeToShowUser(props){
    const initialInputState = { ingredient: '' }
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { ingredient } = eachEntry
  
    const handleInputChange = e => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
    }
    const handleSubmit = (eachEntry, id) => {
        props.addIngredient(eachEntry, id)
        setEachEntry(initialInputState)
    } 
    console.log(props);
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === props.showSingleUserRecipe.id){
            return(
                <React.Fragment>
                <List.Item key={ingredient.id}>{ingredient.ingredient}</List.Item>
                <Button
                
                icon='x'
                
                size='mini'
                onClick={() => props.deleteSingleIngredient(ingredient.id)}
                />
                </React.Fragment>
            )
        } else {
            return null
        }
    })
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
                <Form.Input
                name="ingredient"
                placeholder="Add Ingredient"
                onChange={handleInputChange}
                value={ingredient}
                ></Form.Input><Button onClick={() => handleSubmit({ingredient}, props.showSingleUserRecipe.id)}>Add Ingredient</Button>
                
                <List>
                {ingredients}
                </List>
                <Card.Description>
                   {props.showSingleUserRecipe.instructions}
                    
                </Card.Description>
                <Card.Content>
                
                <Button
                size={"tiny"} 
                basic color={"red"}
                onClick={() => props.deleteMyRecipe(props.showSingleUserRecipe.id, props.closeSingleUserRecipe())}>Delete</Button>
                <Button
                size={"tiny"}
                basic color={"green"}
                onClick={() => props.editMyRecipe(props.showSingleUserRecipe.id)}>Edit</Button>
                </Card.Content>
                <Card.Content>
                <Button onClick={() => props.closeSingleUserRecipe()}>Back To All My Recipes</Button>
                </Card.Content>
            </Card.Content>
            </Card>
        )
    }