import { Form, Label, Button, Modal, TextArea, Checkbox } from 'semantic-ui-react'
import React, {useState} from 'react'

export default function NewRecipeModal(props) {
  const [open, setOpen] = React.useState(false)
    const initialInputState = { title: '', image: '', servings: 0, readyInMinutes: 0, owner: '', instructions: '', shared: false }
    const [eachEntry, setEachEntry] = useState(initialInputState)
    const { title, image, servings, readyInMinutes, instructions, shared} = eachEntry
  
  const handleInputChange = e => {
  setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
  // when the box is checked, shared should be true
  console.log(shared);
}
  const boxChecked = (e) =>{
    setEachEntry(({ shared, ...prevState }) => 
      ({ ...prevState, shared: !shared})
    )
    console.log(eachEntry);
    console.log(shared);
  }
  const boxUnChecked = () =>{
    setEachEntry(({ shared, ...prevState }) => 
      ({ ...prevState, shared: !shared})
    )
    console.log(eachEntry);
  }
  // const handleChange = e =>{
  //   setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
  //   console.log(eachEntry);
  // }

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
      <Modal.Header className="modal-header">Create A New Recipe for your Cookbook. Don't Worry, You'll Add Your Ingredients Next!</Modal.Header>
    <Form>
      <Modal.Content className="modal-content">
        
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
          {/*
            {shared} === true
            ?
          <Form.Field id="checkbox-on" >
            <Checkbox value={shared} onClick={boxChecked} label="Share to Shared Recipes?"/>
          </Form.Field>
            :
            <Form.Field id="checkbox-off" >
            <Checkbox value={shared} onClick={boxUnChecked} label="Share to Shared Recipes?"/>
          </Form.Field>
          */}
          <Form.Field id="checkbox-on" >
            <Checkbox  value={shared} onClick={boxChecked} label="Share to Shared Recipes?"/>
          </Form.Field>
          
          {/*<Form.Group inline>
            <label>Share to Shared Recipes?</label>
        <Form.Field >
          <Checkbox
            radio
            label='Yes'
            name="shared"
            value={shared}
            checked={true}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label='No'
            name="shared"
            value={shared}
            checked={false}
            onChange={handleChange}
          />
        </Form.Field>
          </Form.Group>*/}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions className="modal-actions">
        <Button color='black' onClick={() => setOpen(false)}>
          Close
        </Button>
        <Button
          id="edit-new-button"
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