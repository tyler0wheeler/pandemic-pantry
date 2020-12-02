import React, { Component } from 'react'
import NavigationBar from '../NavigationBar'
import SearchContainer from '../SearchContainer'
import ShowAllUserRecipes from '../ShowAllUserRecipes'


export default class CookbookContainer extends Component{
    constructor(){
        super()
        this.state = {
            allRecipes: [],
            userRecipes: [],
            loggedIn: false,
            loggedInUser: null,
            conditionalView: ''
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

        showUserRecipes = () => {
            this.setState({
                conditionalView: 'show user recipes'
            })
        }
    render(){
        return(
            <React.Fragment>
                <NavigationBar
                login={this.login}
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
                />
            }
                </React.Fragment>
        )
    }
} 