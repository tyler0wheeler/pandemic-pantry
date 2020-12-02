import React, { Component } from 'react'
import SearchRecipeList from '../SearchRecipeList'
import SingleSearchRecipe from '../SingleSearchRecipe'


export default class SearchContainer extends Component {
    constructor(){
        super()
        this.state = {
            searchedRecipes: [],
            singleRecipe:{
                "title":"Char-Grilled Beef Tenderloin with Three-Herb Chimichurri",
                "image":"https://spoonacular.com/recipeImages/char-grilled-beef-tenderloin-with-three-herb-chimichurri-156992.jpg",
                "servings":10,
                "readyInMinutes":45,
                "id":156992,
                "instructions":"PreparationFor spice rub: Combine all ingredients in small bowl. Do ahead: Can be made 2 days ahead. Store airtight at room temperature. For chimichurri sauce: Combine first 8 ingredients in blender; blend until almost smooth. Add 1/4 of parsley, 1/4 of cilantro, and 1/4 of mint; blend until incorporated. Add remaining herbs in 3 more additions, pureeing until almost smooth after each addition. Do ahead: Can be made 3 hours ahead. Cover; chill. For beef tenderloin: Let beef stand at room temperature 1 hour. Prepare barbecue (high heat). Pat beef dry with paper towels; brush with oil. Sprinkle all over with spice rub, using all of mixture (coating will be thick). Place beef on grill; sear 2 minutes on each side. Reduce heat to medium-high. Grill uncovered until instant-read thermometer inserted into thickest part of beef registers 130F for medium-rare, moving beef to cooler part of grill as needed to prevent burning, and turning occasionally, about 40 minutes. Transfer to platter; cover loosely with foil and let rest 15 minutes. Thinly slice beef crosswise. Serve with chimichurri sauce. *Available at specialty foods stores and from tienda.com.",
                "extendedIngredients":[{"originalString":"1 3 1/2-pound beef tenderloin"},
                {"originalString":"1 3 1/2-pound beef tenderloin"}
                ],

            },
            searchIngredients: '',
            conditionalView: 'single recipe view',
            idOfSearchedRecipeToShow: 156992
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