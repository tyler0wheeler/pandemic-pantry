import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import { Form, Button} from 'semantic-ui-react'
import SearchRecipeList from '../SearchRecipeList'
import SingleSearchRecipe from '../SingleSearchRecipe'
import SavedSearchedRecipes from '../SavedSearchedRecipes'
import RecipeToShowSavedRecipe from '../RecipeToShowSavedRecipe'

export default class SearchContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchedRecipes: [],
            singleRecipe: null,
            savedRecipes: [],
            searchIngredients: '',
            conditionalView: 'search bar',
            idOfSearchedRecipeToShow: -1,
            currentUser: props.currentUser,
            loggedIn: props.loggedIn,
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
                "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                'Content-Type': 'application/json'

            }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            this.setState({
                searchedRecipes: responseJson,
                conditionalView: 'show search results'
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
                    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
                    "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
                    'Content-Type': 'application/json'
                }
            })
            const responseJson = await response.json()
            console.log(responseJson);
            this.setState({
                singleRecipe: responseJson,
                idOfSearchedRecipeToShow: id,
                conditionalView: 'single recipe view'
            })
            }catch(err){
            console.log("Error getting single recipe by id", err);
            }
            console.log("this is the single recipe searched", this.state.singleRecipe);
        }
        getSavedRecipes = async () =>{
            try{
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/searched-recipes/savedrecipes/"
                const recipesResponse = await fetch(url,{
                    credentials: 'include'
                })
                const recipesJson= await recipesResponse.json()
                this.setState({
                    savedRecipes: recipesJson.data.searchedrecipes,
                    savedIngredients: recipesJson.data.searchedingredients
                })
                } catch (err){
                    console.log("Error getting Saved Recipes data", err)
                }
        }
        saveRecipe = async (recipeToAdd) =>{
            try{
                console.log(recipeToAdd);
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/searched-recipes/"
                const savedRecipeResponse = await fetch(url,{
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(recipeToAdd)
                })
                const savedRecipeJson = await savedRecipeResponse.json()
                console.log("This is the recipe being created", savedRecipeJson);
                if(savedRecipeResponse.status === 200){
                    this.setState({
                        savedRecipes: [...this.state.savedRecipes, savedRecipeJson.data],
                        conditionalView: 'show saved recipes'
                    })
                }
            } catch(err){
                console.log("Error saving recipe", err);
            }
            this.getSavedRecipes()
        }
        deleteSavedRecipe = async (id, func) => {
            try {
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/searched-recipes/" + id
                const deleteSavedRecipeResponse = await fetch(url, {
                    credentials: 'include',
                    method: "DELETE"
                })
                const deleteSavedRecipeJson = await deleteSavedRecipeResponse.json()
                if(deleteSavedRecipeJson.status === 200 || deleteSavedRecipeJson.status === 201) {
                    
                    this.setState({
                        conditionalView: 'show saved recipes',
                        idOfSearchedRecipeToShow: -1
                        
                        })
                    this.setState({
                        savedRecipes: this.state.savedRecipes.filter(recipe => recipe.id !== id),
                    })                              
                }
            } catch(err) {
                console.log("There was an error deleting the recipe", id)
            }        
            this.getSavedRecipes()
        }
        showSingleSearchedRecipe = (id) => {
            console.log("you are trying to show recipe with id: ", id)
            this.getSingleSearchedRecipe(id)
            this.setState({
                idOfSearchedRecipeToShow: id,
                conditionalView: 'single recipe view'
            })
        }
        showSingleRecipe = (id) => {
            console.log("you are trying to show recipe with id: ", id)
            this.setState({
                idOfRecipeToShow: id,
                conditionalView: 'show this saved recipe'
                })    
        }
        closeShowModal = () => {
            this.setState({
                idOfSearchedRecipeToShow: -1,
                conditionalView: 'show search results'
            })
        }
        showSavedSearchRecipes = () =>{
          this.setState({
                conditionalView: 'show saved recipes'
            })
            this.getSavedRecipes()
        }
        backToSearch = () => {
            this.setState({
                conditionalView: 'search bar'
            })
        }
        closeSingleRecipe = () => {
            this.setState({
                conditionalView: 'show saved recipes',
                idOfRecipeToShow: -1
            })
            // this.getSavedRecipes()
        }
        closeSearchedRecipes = () => {
            this.setState({
                idOfSearchedRecipeToShow: -1,
                conditionalView: 'show saved results'
            })
        }
    // componentDidMount(){
    //     this.getSavedRecipes()
    // }
    render(){
        return(
            <React.Fragment>
                {
                this.state.conditionalView === 'search bar'
                &&
            <Fade bottom>
                <h1>Search Spoonacular</h1>
            <Form className="search-bar">
                <Form.Field id="search-field">
                    <Form.Input
                    name="word" 
                    type="search"
                    placeholder="Enter ingredients separated by commas" 
                    value={this.state.searchIngredients} 
                    onChange={this.handleInputChange}
                    />
                </Form.Field>
                <Button
                id="search-button"
                size="small"
                content="Search Recipes"
                labelPosition='right'
                icon='checkmark'
                onClick={this.search}
                positive>
                </Button>
                {
                    this.state.loggedIn === true
                    &&
                <Button id="show-saved-recipes" onClick={this.showSavedSearchRecipes}>Saved Searched Recipes</Button>
                }
            </Form>
            </Fade>
            }
            {
                this.state.conditionalView === "show search results"
                    &&
                <SearchRecipeList
                backToSearch={this.backToSearch}
                searchedRecipes={this.state.searchedRecipes}
                showSingleRecipe={this.getSingleSearchedRecipe}/>
            }
            {
                this.state.idOfSearchedRecipeToShow !== -1 && this.state.conditionalView === "single recipe view"
                &&
                <SingleSearchRecipe
                showThisRecipe={this.state.singleRecipe}
                closeShowModal={this.closeShowModal}
                saveRecipe={this.saveRecipe}
                addIngredient={this.addIngredient}
                loggedIn={this.state.loggedIn}
                />
            }
            {
                this.state.conditionalView === 'show saved recipes'
                &&            
                <SavedSearchedRecipes
                deleteSavedRecipe={this.deleteSavedRecipe}
                closeSingleRecipe={this.closeSearchedRecipes}
                savedRecipes={this.state.savedRecipes}
                showSingleRecipe={this.showSingleRecipe}
                backToSearch={this.backToSearch}
                />
            }
            {
                this.state.conditionalView === "show this saved recipe" && this.state.idOfRecipeToShow !==-1
                &&
                <RecipeToShowSavedRecipe
                showSingleRecipe={this.state.savedRecipes.find((recipe) => recipe.id === this.state.idOfRecipeToShow)}
                closeSingleRecipe={this.closeSingleRecipe}
                deleteSavedRecipe={this.deleteSavedRecipe}
                />
            }    
        </React.Fragment>
        )
    }
}