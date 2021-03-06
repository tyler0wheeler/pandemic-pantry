import React, { useState } from 'react'
import Fade from 'react-reveal/Fade';
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
    // console.log(props);
    const ingredients = props.ingredients.map(ingredient=> { 
        if (ingredient.recipe.id === props.showSingleUserRecipe.id){
            return(
                <React.Fragment>
                <List.Item key={ingredient.id}>{ingredient.ingredient}</List.Item>
                <Button
                
                icon='x'
                id="delete-ingredient"
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
        <Fade left>
        <Card raised key={props.showSingleUserRecipe.id} centered={true} id="single-view-card">
            <Image 
                    src={props.showSingleUserRecipe.image} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header id="card-header">
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
                id="ingredient-input"
                ></Form.Input><Button id="add-ingredient-button" onClick={() => handleSubmit({ingredient}, props.showSingleUserRecipe.id)}>Add Ingredient</Button>
                
                <List>
                {ingredients}
                </List>
                <h5 id="list-item">Instructions</h5>
                <Card.Description>
                   {props.showSingleUserRecipe.instructions}
                    
                </Card.Description>
                <Card.Content>
                
                <Button
                className="delete-modal-open-button"
                size={"small"} 
                onClick={() => props.deleteMyRecipe(props.showSingleUserRecipe.id, props.closeSingleUserRecipe())}>Delete</Button>
                <Button
                className="edit-modal-open-button"
                size={"small"}
                onClick={() => props.editMyRecipe(props.showSingleUserRecipe.id)}>Edit</Button>
                </Card.Content>
                <Card.Content>
                <Button id="back-button" onClick={() => props.closeSingleUserRecipe()}>Back To All My Recipes</Button>
                </Card.Content>
            </Card.Content>
            </Card>
            </Fade>
        )
    }