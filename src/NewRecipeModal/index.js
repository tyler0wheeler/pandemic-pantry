import { Form, Label, Button, Modal, TextArea } from 'semantic-ui-react'
import React, {useState} from 'react'

export default function NewRecipeModal(props) {
  const [open, setOpen] = React.useState(false)
    const initialInputState = { title: '', image: '', servings: 0, readyInMinutes: 0, owner: '', instructions: '' }
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { title, image, servings, readyInMinutes, instructions} = eachEntry
  
  const handleInputChange = e => {
  setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
}

  const handleSubmit = e => {
    props.createUserRecipe(eachEntry)
    setOpen(false)
    setEachEntry(initialInputState)
  } 

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Create Recipe</Button>}
    >
      <Modal.Header>Create A New Recipe for your Cookbook</Modal.Header>
    <Form>
      <Modal.Content>
        
        <Modal.Description>
          <Label htmlFor="title">Recipe Title</Label>
          <Form.Input
            name="title"
            placeholder="Recipe Title"
            onChange={handleInputChange}
            value={title}
          />
          <Label htmlFor="image">Image Link</Label>
          <Form.Input
            name="image"
            placeholder="Recipe Image URL"
            onChange={handleInputChange}
            value={image}
          />
          <Label htmlFor="servings">How Many Servings?</Label>
          <Form.Input
            name="servings"
            placeholder="Number of Servings"
            onChange={handleInputChange}
            value={servings}
          />
          <Label htmlFor="readyInMinutes">How Many Minutes to Prepare?</Label>
          <Form.Input
            name="readyInMinutes"
            placeholder="Time in Minutes"
            onChange={handleInputChange}
            value={readyInMinutes}
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
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          content="Add Your Recipe"
          labelPosition='right'
          icon='checkmark'
          onClick={handleSubmit}
          positive
        >
        Add Your Recipe
      </Button>
      </Modal.Actions>
        </Form>  
    </Modal>
  )
}