import React from 'react'
import Fade from 'react-reveal/Fade';
import {Card,Image, List, } from 'semantic-ui-react'




export default function SavedSearchedRecipes(props){
    // const initialInputState = { ingredient: '' }
    // const [eachEntry, setEachEntry] = useState(initialInputState)
    // const { ingredient } = eachEntry
  
    // const handleInputChange = e => {
    // setEachEntry({ ...eachEntry, [e.target.name]: e.target.value })
    // }
    // const handleSubmit = (eachEntry, id) => {
    //     props.addIngredient(eachEntry, id)
    //     setEachEntry(initialInputState)
    // } 
   
    const allRecipes = props.savedRecipes.map(recipe => {
    // const ingredients = props.savedIngredients.map(ingredient=> { 
    //     if (ingredient.recipe.id === recipe.id){
    //         return(
    //             <List.Item id="list-item" key={ingredient.id}>{ingredient.ingredient}</List.Item>
    //         )
    //     } else {
    //         return null
    //     }
    // })
    return(
        <Card  raised key={recipe.id} id="item-recipe">
            <Image 
                     src={recipe.image} alt="food pic"/>
            <Card.Content textAlign={"center"}>
                <Card.Header>
                    {recipe.title}
                </Card.Header>
                <Card.Meta>
                Ready in {recipe.readyInMinutes} minutes
                </Card.Meta>
                <Card.Meta>
                Serves :{recipe.servings}
                </Card.Meta>
                <List>
                <h5 id="list-item">Ingredients</h5>
                {/*ingredients*/}
                </List>
                <h5 id="list-item">Instructions</h5>
                <Card.Description>
                   {recipe.instructions}
                    
                </Card.Description>
            </Card.Content>                    
            </Card>
            
        )
    })
    return(
        <Fade left>
            <h1>My Saved Recipes</h1>
        <Card.Group centered={true}>
            {allRecipes}
        </Card.Group>
        </Fade>
    )

}