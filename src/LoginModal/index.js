import React, { useState } from 'react'
import { Button, Modal, Form, Segment } from 'semantic-ui-react'



export default function LoginModal(props) {
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
        props.login(eachEntry)
        setOpen(false)
    }


  return (
    <Modal
        size="mini"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={<Button className="login-register-modal-buttons">Sign On</Button>}
        >
        <Modal.Header className="modal-header">Sign On
            <Button
                id='header-close'
                icon='x'
                floated='right'
                size='tiny'
                onClick={() => setOpen(false)}
                />
        </Modal.Header>
        <Modal.Content className="modal-content">
        <Segment placeholder>

        <Form>
          <Form.Input
            required
            icon='user'
            iconPosition='left'
            label='Username'
            name = 'username'
            onChange = {handleInputChange}
            value = {username}
            placeholder='Username'
          />
          <Form.Input
            
            
            
            required
            icon='lock'
            iconPosition='left'
            label='Password'
            name = 'password'
            onChange = {handleInputChange}
            value = {password}
            type='password'          
          />
          <Button 
            content='Sign On'
            className="modal-submit-login-register"
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

