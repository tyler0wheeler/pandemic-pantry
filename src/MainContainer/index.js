import React, { Component } from 'react'
import SearchRecipeList from '../SearchRecipeList'
import SingleSearchRecipe from '../SingleSearchRecipe'


export default class MainContainer extends Component {
    constructor(){
        super()
        this.state = {
            searchedRecipes: [],
            singleRecipe:[],
            searchIngredients: '',
            conditionalView: '',
            idOfRecipeToShow: -1
        }
    }
    handleInputChange = (event) => {
        console.log(event.target.value);
        this.setState({
            searchIngredients: event.target.value  
        })
      }
    search = searchIngredients =>{
        console.log(this.state.searchIngredients);
        this.setState({
          searchIngredients: this.state.searchIngredients
        })
        this.getSearchedRecipes()
      }
      getSearchedRecipes = async () => {
          try{
          const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${this.state.searchIngredients}&number=1&ranking=1&ignorePantry=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "39fbd3d3e7msh279b93d85ec0aadp115acdjsn9506b29b04bb",
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                'Content-Type': 'application/json'

            }
        })
        console.log(response);
        const responseJson = await response.json()
        console.log(responseJson);
        this.setState({
            searchedRecipes: responseJson
        }) 
        }catch(err){
            console.log("Error getting recipes in search", err);
        }
      }
      getSingleSearchedRecipe = async (id) => {
          try{
            const response = await fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-key": "39fbd3d3e7msh279b93d85ec0aadp115acdjsn9506b29b04bb",
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    'Content-Type': 'application/json'
                }
            })
            console.log(response);
            const responseJson = await response.json()
            console.log(responseJson);
            this.setState({
                singleRecipe: responseJson
            })
          }catch(err){
            console.log("Error getting single recipe by id", err);
          }
      }
      showSingleRecipe = (id) => {
        console.log("you are trying to show recipe with id: ", id)
        this.getSingleSearchedRecipe(id)
        this.setState({
            idOfRecipeToShow: id,
            conditionalView: 'single recipe view'
        })
        console.log(this.state.idOfRecipeToShow);
      }
      closeShowModal = () => {
        this.setState({
            idOfPostToShow: -1,
            conditionalView: ''
        })
    }
    render(){
        return(
            <React.Fragment>
            {
                this.state.conditionalView === ''
                &&
            <div className="search_bar">
            <input name="word" type="search" value={this.state.searchIngredients} onChange={this.handleInputChange}/>
            <input type="button" value="Search" onClick={this.search} />
            <SearchRecipeList
            searchedRecipes={this.state.searchedRecipes}
            showSingleRecipe={this.showSingleRecipe}
            />
            </div>
            }
            {
                this.state.idOfRecipeToShow !== -1 && this.state.conditionalView === "single recipe view"
                &&
                <SingleSearchRecipe
                showThisRecipe={this.state.singleRecipe}
                closeShowModal={this.closeShowModal}
                />
            }
        </React.Fragment>
        )
    }
}