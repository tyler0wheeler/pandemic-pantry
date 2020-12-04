import React, { useState } from 'react'
import {Container, Menu, Button}
from 'semantic-ui-react'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import NewRecipeModal from '../NewRecipeModal'



const NavigationBar = (props) => (
<React.Fragment>
    <Menu
      widths={5}
      position='left' 
      fixed='top' 
      color="blue"
      >
      
        <Menu.Item 
        header id='nav-title'
        >   
          The Pandemic Pantry
        </Menu.Item>
        <Button
          basic
          onClick ={() => props.showAllRecipes()}
          compact >Shared Recipes</Button> 
        {
          props.loggedIn === true
          ?
          <React.Fragment>
            <Menu.Item>
          <Button
            basic
            compact
            onClick ={() => props.showUserRecipes()}>My CookBook</Button>
            </Menu.Item>
            <Menu.Item>
            Welcome, {props.loggedInUser}!
            </Menu.Item>
            <Menu.Item>
            <NewRecipeModal
          createUserRecipe={props.createUserRecipe}/>
          </Menu.Item>
        <Menu.Menu position="right">
          <Button
            
            basic
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
      
    </Menu>   
    </React.Fragment>
)

export default NavigationBar