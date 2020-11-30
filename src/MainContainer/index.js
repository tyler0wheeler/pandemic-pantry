import React, { Component } from 'react'
import SearchRecipeList from '../SearchRecipeList'


export default class MainContainer extends Component {
    constructor(){
        super()
        this.state = {
            searchedRecipes: [],
            searchIngredients: ''
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
    render(){
        return(
            <div className="search_bar">
            <input name="word" type="search" value={this.state.searchIngredients} onChange={this.handleInputChange}/>
            <input type="button" value="Search" onClick={this.search} />
            <SearchRecipeList
            searchedRecipes={this.state.searchedRecipes}
            />
        </div>
        )
    }
}