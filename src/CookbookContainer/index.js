import React, { Component } from 'react'
import NavigationBar from '../NavigationBar'
import SearchContainer from '../SearchContainer'
import ShowAllUserRecipes from '../ShowAllUserRecipes'
import RecipeToShowUser from '../RecipeToShowUser'
import EditRecipeModal from '../EditRecipeModal'


export default class CookbookContainer extends Component{
    constructor(){
        super()
        this.state = {
            allRecipes: [],
            userRecipes: [],
            loggedIn: false,
            loggedInUser: null,
            conditionalView: '',
            idOfRecipeToShow: -1,
            idOfRecipeToEdit: -1
        }
    }
        getAllRecipes = async () =>{
            try{
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/recipes/"
                const recipesResponse = await fetch(url)
                const recipesJson = await recipesResponse.json()
                this.setState({
                    allRecipes: recipesJson.data
                })
                console.log(recipesJson)
            }catch(err){
                console.log("Error getting posts data", err)

                }    
            }
        getUserRecipes = async () =>{
            try{
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/recipes/userrecipes/"
                const recipesResponse = await fetch(url,{
                    credentials: 'include'
                })
                const recipesJson= await recipesResponse.json()
                this.setState({
                    userRecipes: recipesJson.data
                    // likes: postsJson.data.likes
            })
            } catch (err){
                console.log("Error getting User Recipes data", err)
            }
        }
        createUserRecipe = async (recipeToAdd) =>{
            try{
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/recipes/"
                const createdRecipeResponse = await fetch(url,{
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recipeToAdd)
                })
                const createdRecipeJson = await createdRecipeResponse.json()
                console.log("This is the recipe being created", createdRecipeJson);
                if(createdRecipeResponse.status === 200){
                    this.setState({
                        userRecipes: [...this.state.userRecipes, createdRecipeJson.data],
                        conditionalView: 'show user recipes'
                    })
                }
            } catch(err){
                console.log("Error adding recipe", err);
            }
            this.getUserRecipes()
        }
        deleteMyRecipe = async (id) => {
            try {
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/recipes/" + id
                const deleteMyRecipeResponse = await fetch(url, {
                    credentials: 'include',
                    method: "DELETE"
                })
                const deleteMyRecipeJson = await deleteMyRecipeResponse.json()
                console.log("I want to delet this recipe: ", deleteMyRecipeJson)
                console.log(deleteMyRecipeJson.status);
                if(deleteMyRecipeJson.status === 200) {
                    this.setState({
                        userRecipes: this.state.userRecipes.filter(recipe => recipe.id !== id),
                        // likes: this.state.likes.filter(like => like.user.id !==id),
                        conditionalView: 'show user recipes',
                        idOfRecipeToShow: -1
                        
                    })
                    console.log(this.state.userRecipes);              
                }
            } catch(err) {
                console.log("There was an error deleting the recipe", id)
            }
            console.log(this.state.conditionalView);
            // console.log(this.state.userRecipes);
            this.getUserRecipes()
        }

        updateMyRecipe = async (updateRecipe) => {
            try {
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/recipes/" + this.state.idOfRecipeToEdit
    
                const updateRecipeResponse = await fetch(url, {
                    credentials: 'include',
                    method: "PUT",
                    body: JSON.stringify(updateRecipe),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const updateRecipeJson = await updateRecipeResponse.json()
                console.log(updateRecipeJson)
                this.setState({
                    idOfRecipeToEdit: -1,
                    conditionalView: 'show user recipes'
                })
    
            } catch(err) {
                console.log("error trying to edit post: ", updateRecipe)
            }
            this.getUserRecipes() 
        }






        login = async (loginInfo) => {
            console.log("login() in App.js called with the following info", loginInfo);
            const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/users/login/"
          
            try {
              const loginResponse = await fetch(url, {
                credentials: 'include', // sends cookie
                method: 'POST',
                body: JSON.stringify(loginInfo),
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              console.log("loginResponse", loginResponse);
              const loginJson = await loginResponse.json()
              console.log("loginJson", loginJson);
          
              if(loginResponse.status === 200) {
                  this.setState({
                    loggedIn: true,
                    loggedInUser: loginJson.data.username
                  })
                  console.log(loginJson.data);
                //   this.getUserPost()
                }
            } catch(error) {
              console.error("Error trying to log in")
              console.error(error)
            }
            this.getUserRecipes()
          }
          register = async (registerUser) =>{
            console.log("register() in App.js called with the following info", registerUser);
            const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/users/register/"
            try {
                const registerUserResponse = await fetch(url, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registerUser)
                })
            const registerUserJson = await registerUserResponse.json()
            console.log(registerUserJson);
            } catch (err){
                console.log("Error in registering", registerUser);
            }
            this.login(registerUser)
        }
        logout = async () =>{
            console.log("Logout has occured for this username");
            try{
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/users/logout/"
                const logoutResponse = await fetch(url)
                const logoutJson = await logoutResponse.json()
                this.setState({
                    loggedInUser: null,
                    loggedIn: false,
                    conditionalView: ''
    
                })
                console.log(logoutJson)
            }catch(err){
                console.log("Error getting posts data", err)
    
                }    
            }
        editMyRecipe = (id) => {
            // console.log("You are trying to edit a post with the id of: ", idOfPostToEdit)
            this.setState({
                idOfRecipeToEdit: id,
                conditionalView: "edit this recipe"
            })
        }

        showUserRecipes = () => {
            this.setState({
                conditionalView: 'show user recipes'
            })
        }
        showSingleUserRecipe = (id) => {
            console.log("you are trying to show user recipe with id: ", id)
            this.setState({
                idOfRecipeToShow: id,
                conditionalView: 'show this user recipe'
                })
        }
        closeSingleUserRecipe = () =>{
            this.setState({
                conditionalView: 'show user recipes'
            })
        }


    render(){
        return(
            <React.Fragment>
                <NavigationBar
                login={this.login}
                createUserRecipe={this.createUserRecipe}
                register={this.register}
                logout={this.logout}
                loggedIn={this.state.loggedIn}
                loggedInUser={this.state.loggedInUser}
                showUserRecipes={this.showUserRecipes}
                />
                <h4>{this.state.loggedInUser}</h4>
                <SearchContainer/>
            {   
                this.state.conditionalView === 'show user recipes'
                &&
                <ShowAllUserRecipes
                userRecipes={this.state.userRecipes}
                showSingleUserRecipe={this.showSingleUserRecipe}
                editMyRecipe={this.editMyRecipe}
                deleteMyRecipe={this.deleteMyRecipe}
                />
            }
            {
                this.state.idOfRecipeToShow !== -1 && this.state.conditionalView === 'show this user recipe'
                &&
                <RecipeToShowUser
                showSingleUserRecipe={this.state.userRecipes.filter((recipe) => recipe.id === this.state.idOfRecipeToShow)}
                closeSingleUserRecipe={this.closeSingleUserRecipe}
                />
            }
            {
                this.state.idOfRecipeToEdit !== -1 && this.state.conditionalView === 'edit this recipe'
                &&
                <EditRecipeModal
                recipeToEdit={this.state.userRecipes.find((recipe)=> recipe.id === this.state.idOfRecipeToEdit)}
                showUserRecipes={this.showUserRecipes}
                updateMyRecipe={this.updateMyRecipe}
                editMyRecipe={this.editMyRecipe}
                />
            }
                </React.Fragment>
        )
    }
} 