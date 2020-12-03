import React, { useState } from 'react'
import {Container, Menu, Button}
from 'semantic-ui-react'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import NewRecipeModal from '../NewRecipeModal'



const NavigationBar = (props) => (


  <React.Fragment>
    <Menu
      position='left' 
      fixed='top' inverted>
      <Container>
        <Menu.Item 
        header id='nav-title'
        >   
          The Pandemic Pantry
        </Menu.Item>
        {
          props.loggedIn === true
          ?
          <React.Fragment>
        <Button
          basic
          color="grey"
          compact
           >Home</Button> 
          <Button
            basic
            color="grey"
            compact
            onClick ={() => props.showUserRecipes()}>My Posts</Button>
            <NewRecipeModal
          createUserRecipe={props.createUserRecipe}/>
        <Menu.Menu position="right">
          <Button
            id="logout-btn"
            basic
            color="grey"
            compact
            onClick={() => props.logout()}>Log Out</Button>
          </Menu.Menu>
        </React.Fragment>
        :   
        <React.Fragment>
        <Menu.Menu position="right">  
        <LoginModal
          id="login-modal"
          login={props.login}
           />
        <RegisterModal
          id="reg-modal"
          login={props.login}
          register={props.register}
          
          />
          </Menu.Menu>    
          </React.Fragment>
        } 
      </Container>
    </Menu>   
    </React.Fragment>
)

export default NavigationBar