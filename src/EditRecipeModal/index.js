import React, { useState } from 'react'

import { Form, Label, Button, Modal, TextArea, Checkbox } from 'semantic-ui-react'

export default function EditRecipeModal(props) {
    const [open, setOpen] = React.useState(false)
        const initialInputState = { 
            title: props.recipeToEdit.title, 
            image: props.recipeToEdit.image, 
            readyInMinutes: props.recipeToEdit.readyInMinutes, 
            servings: props.recipeToEdit.servings,
            instructions: props.recipeToEdit.instructions,
            shared: props.recipeToEdit.shared
        }

        


        const [eachEntry, setEachEntry] = useState(initialInputState)
        const { title, image, readyInMinutes, servings, instructions, shared} = eachEntry

    const handleInputChange = e => {
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
    }
    const boxChecked = (e) =>{
        setEachEntry(({ shared, ...prevState }) => 
          ({ ...prevState, shared: !shared})
        )
        console.log(eachEntry);
        console.log(shared);
      }

    const handleSubmit = e => {
        props.updateMyRecipe(eachEntry)
        setOpen(false)
      }



    return (
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                size="large"
                open={() => props.editMyRecipe(props.recipeToEdit.id)}
                >
            <Modal.Header className="modal-header" >Edit Your Recipe</Modal.Header>
            <Form>
            <Modal.Content className="modal-content">
                
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
                    size="large"
                    placeholder="Instructions"
                    onChange={handleInputChange}
                    value={instructions}
                />
                {
                    props.recipeToEdit.shared === true
                    ?
                <Form.Field id="checkbox-on" >
                <Checkbox defaultChecked={true} value={shared} onClick={boxChecked} label="Share to Shared Recipes?"/>
                </Form.Field>
                    :
                <Form.Field id="checkbox-off" >
                <Checkbox value={shared} onClick={boxChecked} label="Share to Shared Recipes?"/>
                </Form.Field>
                }
                </Modal.Description>
            </Modal.Content>
            <Modal.Content>
            <Modal.Actions className="modal-actions">
                <Button 
                size="small" 
                color='black'
                onClick={() => props.showUserRecipes()}>
                Don't Edit
                </Button>
                <Button
                id="edit-new-button"
                size="small"
                content="Update Recipe"
                labelPosition='right'
                icon='checkmark'
                onClick={handleSubmit}
                positive>
                Update Recipe
                </Button>
            </Modal.Actions>
            </Modal.Content>
                </Form>  
            </Modal>
        )
}
