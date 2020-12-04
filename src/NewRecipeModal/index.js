import { Form, Label, Button, Modal, TextArea, Checkbox } from 'semantic-ui-react'
import React, {useState} from 'react'

export default function NewRecipeModal(props) {
  const [open, setOpen] = React.useState(false)
    const initialInputState = { title: '', image: '', servings: 0, readyInMinutes: 0, owner: '', instructions: '', shared: false }
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { title, image, servings, readyInMinutes, instructions, shared} = eachEntry
  
  const handleInputChange = e => {
  setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
}
  const boxChecked = (e) =>{
    setEachEntry({...eachEntry, shared: true})
    console.log(eachEntry);
  }
  const boxUnChecked = (e) =>{
    setEachEntry({...eachEntry, shared: false})
    console.log(eachEntry);
  }
  

  const handleSubmit = e => {
    props.createUserRecipe(eachEntry)
    setOpen(false)
    setEachEntry(initialInputState)
  } 

  return (
    <Modal
      centered
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Create Recipe</Button>}
    >
      <Modal.Header>Create A New Recipe for your Cookbook. Don't Worry, You'll Add Your Ingredients Next!</Modal.Header>
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
          <Form.Field id="checkbox" >
            <Checkbox value={shared} onChange={boxChecked} onClick={boxUnChecked} label="Share to Shared Recipes?"/>
          </Form.Field>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          size="small"
          content="Update Recipe"
          labelPosition='right'
          icon='checkmark'  
          positive
          onClick={handleSubmit}
        >
        Add Your Recipe
      </Button>
      </Modal.Actions>
        </Form>  
    </Modal>
  )
}