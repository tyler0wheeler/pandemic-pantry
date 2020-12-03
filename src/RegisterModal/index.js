import React, { useState } from 'react'
import { Button, Modal, Form, Segment } from 'semantic-ui-react'



export default function RegisterModal(props) {
    const [open, setOpen] = React.useState(false)
    const intialInputState = {username: '', password: ''}
    const [eachEntry, setEachEntry] = useState(intialInputState)
    const {username, password} = eachEntry
   
     const handleInputChange = (e) =>{
        setEachEntry({ ...eachEntry, [e.target.name]: e.target.value})
    }
     const handleSubmit = (e) =>{
        e.preventDefault()
        //lifting up state
        props.register(eachEntry)
        // props.login(eachEntry)
        setOpen(false)
    }


  return (
    <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button>Register</Button>}
        >
        <Modal.Header >Register
            <Button

                id='header-close'
                icon='x'
                floated='right'
                size='mini'
                onClick={() => setOpen(false)}
                />
        </Modal.Header>
        <Modal.Content >
        <Segment placeholder>

        <Form>
          <Form.Input
            icon='user'
            iconPosition='left'
            label='Username'
            name = 'username'
            onChange = {handleInputChange}
            value = {username}
            placeholder='Username'
           
          />
          <Form.Input
            icon='lock'
            iconPosition='left'
            label='Password'
            name = 'password'
            onChange = {handleInputChange}
            value = {password}
            type='password'
            
          />

          <Button 
            content='Register'
            color='blue'
            primary
            onClick={handleSubmit}
            positive 
          />
        </Form>

  </Segment>
        </Modal.Content>
    </Modal>
  )
}