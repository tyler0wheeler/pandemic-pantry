import React, { Component } from 'react'
import Fade from 'react-reveal/Fade';
import { Form, Button} from 'semantic-ui-react'
import SearchRecipeList from '../SearchRecipeList'
import SingleSearchRecipe from '../SingleSearchRecipe'
import SavedSearchedRecipes from '../SavedSearchedRecipes'


export default class SearchContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            searchedRecipes: [],
            singleRecipe:{
                "title":"Char-Grilled Beef Tenderloin with Three-Herb Chimichurri",
                "image":"https://spoonacular.com/recipeImages/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992.jpg",
                "servings":10,
                "readyInMinutes":45,
                "id":156992,
                "instructions":"PreparationFor spice rub: Combine all ingredients in small bowl. Do ahead: Can be made 2 days ahead. Store airtight at room temperature. For chimichurri sauce: Combine first 8 ingredients in blender; blend until almost smooth. Add 1/4 of parsley, 1/4 of cilantro, and 1/4 of mint; blend until incorporated. Add remaining herbs in 3 more additions, pureeing until almost smooth after each addition. Do ahead: Can be made 3 hours ahead. Cover; chill. For beef tenderloin: Let beef stand at room temperature 1 hour. Prepare barbecue (high heat). Pat beef dry with paper towels; brush with oil. Sprinkle all over with spice rub, using all of mixture (coating will be thick). Place beef on grill; sear 2 minutes on each side. Reduce heat to medium-high. Grill uncovered until instant-read thermometer inserted into thickest part of beef registers 130F for medium-rare, moving beef to cooler part of grill as needed to prevent burning, and turning occasionally, about 40 minutes. Transfer to platter; cover loosely with foil and let rest 15 minutes. Thinly slice beef crosswise. Serve with chimichurri sauce. *Available at specialty foods stores and from tienda.com.",
                "extendedIngredients":[{"originalString":"1/2-pound beef tenderloin"},
                {"originalString":"1/2-pound beef tenderloin"}
                ],

            },
            savedRecipes: [],
            savedIngredients: [],
            searchIngredients: '',
            conditionalView: '',
            idOfSearchedRecipeToShow: -1,
            currentUser: props.currentUser,
            loggedIn: props.loggedIn,
            // searchContainerConditionalView: props.searchContainerConditionalView
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
                "x-rapidapi-key": process.env.RAPID_API_KEY,
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
                    "x-rapidapi-key": process.env.RAPID_API_KEY,
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
        console.log(this.state.savedIngredients);
        console.log(this.state.savedRecipes);
    }
        saveRecipe = async (recipeToAdd) =>{
        try{
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
        console.log(this.state.savedRecipes);
    }
        addIngredient = async (ingredientAdded, id) => {
            try {
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/searched-recipes/searchedingredient/" + id
                const addIngredientResponse = await fetch(url, {
                    credentials: 'include',
                    method: "POST",
                    body: JSON.stringify(ingredientAdded),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                const addIngredientJson = await addIngredientResponse.json()
                console.log("This is addIngredientJson", addIngredientJson);
                if(addIngredientResponse.status === 200){
                    this.setState({
                        savedIngredients: [...this.state.savedIngredients, addIngredientJson.data]
                    })
                }
            } catch(err){
                console.log("Error adding ingredient", err);
            }
            this.getSavedRecipes()
        }
        deleteSavedRecipe = async (id, func) => {
            try {
                const url = process.env.REACT_APP_API_URL + "/pandemic-pantry/searched-recipes/" + id
                const ingredientUrl = process.env.REACT_APP_API_URL + "/pandemic-pantry/searched-recipes/delete-all-ingredients/" + id
                const deleteSavedRecipeResponse = await fetch(url, {
                    credentials: 'include',
                    method: "DELETE"
                })
                const deleteSavedIngredientsWithRecipe = await fetch(ingredientUrl, {
                    credentials: 'include',
                    method: "DELETE"
                })
                const deleteSavedRecipeJson = await deleteSavedRecipeResponse.json()
                const deleteSavedIngredientsJson = await deleteSavedIngredientsWithRecipe.json()
                console.log("I want to delete this recipe: ", deleteSavedRecipeJson)
                console.log("I want to delete these ingredients: ", deleteSavedIngredientsJson)
                if(deleteSavedRecipeJson.status && deleteSavedIngredientsJson.status === 200) {
                    
                    this.setState({
                        conditionalView: 'show saved recipes',
                        idOfSearchedRecipeToShow: -1
                        
                        })
                    this.setState({
                        savedRecipes: this.state.savedRecipes.filter(recipe => recipe.id !== id),
                        savedIngredients: this.state.savedIngredients.filter(ingredient => ingredient.recipe.id !== id)
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
        console.log(this.state.idOfRecipeToShow);
        }
        closeShowModal = () => {
        this.setState({
            idOfSearchedRecipeToShow: -1,
            conditionalView: ''
        })
    }
        showSavedSearchRecipes = () =>{
            this.setState({
                conditionalView: 'show saved recipes'
            })
            this.getSavedRecipes()
        }
    // componentDidMount(){
    //     this.getSavedRecipes()
    // }
    render(){
        return(
            <React.Fragment>
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
                <Button onClick={this.showSavedSearchRecipes()}>Saved Searched Recipes</Button>
                }
            {/*<input name="word" type="search" value={this.state.searchIngredients} onChange={this.handleInputChange}/>
            <input type="button" value="Search" onClick={this.search} />*/}
            <SearchRecipeList
            searchedRecipes={this.state.searchedRecipes}
            showSingleRecipe={this.showSingleRecipe}
            />
            </Form>
            </Fade>
            
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
                savedRecipes={this.state.savedRecipes}/>
            }    
        </React.Fragment>
        )
    }
}