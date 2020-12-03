import React, { useState } from 'react'
import { Form, Label, Button, Modal, TextArea } from 'semantic-ui-react'

export default function EditRecipeModal(props) {
    // console.log("these are the props in editpostmodal: ", props)
    const [open, setOpen] = React.useState(false)
    // console.log(setOpen)
        // variables for useState (form fields and their respective current state values)
        const initialInputState = { 
            title: props.recipeToEdit.title, 
            image: props.recipeToEdit.image, 
            readyInMinutes: props.recipeToEdit.readyInMinutes, 
            servings: props.recipeToEdit.servings,
            instructions: props.recipeToEdit.instructions 
        }

        


        const [eachEntry, setEachEntry] = useState(initialInputState)
        const { title, image, readyInMinutes, servings, instructions} = eachEntry

    const handleInputChange = e => {
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
    }


    const handleSubmit = e => {
        props.updateMyRecipe(eachEntry)
        setOpen(false)
      }



    return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                
                open={() => props.editMyRecipe(props.recipeToEdit.id)}
                >
            <Modal.Header>Edit Your Recipe</Modal.Header>
            <Form>
            <Modal.Content>
                
                <Modal.Description>
                <Label htmlFor="title">Recipe Title</Label>
                <Form.Input
                    name="title"
                    placeholder={title}
                    onChange={handleInputChange}
                    value={title}
                />
                <Label htmlFor="image">Recipe Image Link</Label>
                <Form.Input
                    name="image"
                    placeholder="Enter an Image URL"
                    onChange={handleInputChange}
                    value={image}
                />
                <Label htmlFor="readyInMinutes">How Many Minutes to Prepare?</Label>
                <Form.Input
                    name="readyInMinutes"
                    placeholder={readyInMinutes}
                    onChange={handleInputChange}
                    value={readyInMinutes}
                />
                <Label htmlFor="servings">How Many Servings?</Label>
                <Form.Input
                    name="servings"
                    placeholder={servings}
                    onChange={handleInputChange}
                    value={servings}
                />
                <Label htmlFor="instructions">Instructions for Recipe</Label>
                <Form.Field
                    name="instructions"
                    control={TextArea}
                    placeholder="Instructions"
                    onChange={handleInputChange}
                    value={instructions}
                />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => props.showUserRecipes()}>
                Don't Edit
                </Button>
                <Button
                content="Update Recipe"
                labelPosition='right'
                icon='checkmark'
                onClick={handleSubmit}
                positive
                >
                Update Recipe
            </Button>
            </Modal.Actions>
                </Form>  
            </Modal>
        )
}