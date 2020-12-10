import React, { useState } from 'react'
import Fade from 'react-reveal/Fade';
import { Card, Image, Button, List, Form } from 'semantic-ui-react'

export default function SingleSearchRecipe(props){
    const ingredientToAdd = props.showThisRecipe.extendedIngredients.map(ingredient =>{
        return(
            (' ' + ingredient.originalString)
        )
    })
    const initialInputState = { 
        title: props.showThisRecipe.title, 
        image: props.showThisRecipe.image, 
        readyInMinutes: props.showThisRecipe.readyInMinutes, 
        servings: props.showThisRecipe.servings,
        instructions: props.showThisRecipe.instructions,
        recipeId: props.showThisRecipe.id,
        ingredients: ingredientToAdd.toString()
    }
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { title, image, servings, readyInMinutes, instructions, recipeId, ingredients} = eachEntry
    
    const handleInputChange = e => {
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
        console.log(ingredients);
      }
      
    const ingredientsMap = props.showThisRecipe.extendedIngredients.map(ingredient =>{
            return (
                <List.Item id="list-item" key={ingredient.recipeId}>{ingredient.originalString}</List.Item>
            )
    })
    const handleSubmit = e =>{
        props.saveRecipe(eachEntry)

    }
    return(
        <React.Fragment>
        <Fade left>
              <Card key={props.showThisRecipe.id} centered={true} id="single-view-card" >
                <Image 
                    src={props.showThisRecipe.image} alt="food pic"/>
                <Card.Content textAlign="center">
                    <Card.Header>{props.showThisRecipe.title}</Card.Header>
                    <Card.Meta>
                       Ready in {props.showThisRecipe.readyInMinutes} minutes
                    </Card.Meta>
                    <Card.Meta>
                    Serves :{props.showThisRecipe.servings}
                    
                    </Card.Meta>
                    <List>
                    <h5 id="list-item">Ingredients</h5>
                        {ingredientsMap}
                    </List>
                    <h5 id="list-item">Instructions</h5>
                <Card.Description>
                    {props.showThisRecipe.instructions}
                </Card.Description>
                <Button id="back-button" onClick={props.closeShowModal}>Back</Button>
                {
                    props.loggedIn === true
                    &&
                <Button id="add-ingredient-button" onClick={handleSubmit}>Save to Saved Recipes</Button>
                }
                </Card.Content>
            </Card>
            <Form.Group className="hidden-form">
            <Form.Input
             name="title"
             onChange={handleInputChange}
             value={title}
            />
            <Form.Input
             name="image"
             onChange={handleInputChange}
             value={image}
            />
            <Form.Input
             name="servings"
             onChange={handleInputChange}
             value={servings}
            />
            <Form.Input
             name="readyInMinutes"
             onChange={handleInputChange}
             value={readyInMinutes}
            />
            <Form.Field
             name="instructions"
             onChange={handleInputChange}
             value={instructions}
            />
            <Form.Field
             name="recipeId"
             onChange={handleInputChange}
             value={recipeId}
            />
            <Form.Field
             name="ingredients"
             onChange={handleInputChange}
             value={ingredients}
            />
            </Form.Group>
            </Fade>
        </React.Fragment>
    )

}