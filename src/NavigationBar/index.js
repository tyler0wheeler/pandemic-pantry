import React from 'react'
import { Menu, Button}
from 'semantic-ui-react'
import LoginModal from '../LoginModal'
import RegisterModal from '../RegisterModal'
import NewRecipeModal from '../NewRecipeModal'



export default function NavigationBar(props){
  return(
<React.Fragment>
    <Menu
    className="nav-bar"
      widths={6}
      position='left' 
      fixed='top' 
      >
      
        <Menu.Item 
        header 
        id='title-navbar'
        >   
        The Pandemic Pantry
        </Menu.Item>
        <Menu.Item>
        <Button
          basic
          compact
          onClick ={() => props.showAllRecipes()}
          compact >Shared Recipes</Button> 
          </Menu.Item>
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
        <Menu.Item position="right">
          <Button
            id="logout-navbar"
            basic
            compact
            onClick={() => props.logout()}>Log Out</Button>
          </Menu.Item>
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
}

