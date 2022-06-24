import axios from 'axios';

export function getRecipes() {
    return async function(dispatch) {
        var json = await axios.get('http://localhost:3001/recipes'); // obtiene recetas en general
        return dispatch({
            type: 'GET_RECIPES', 
            payload: json.data
        })   
    }
}

export function getRecipeByName(name){   // obtiene recetas por nombre
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes?name=' + name);

            return dispatch ({
                type: 'GET_RECIPE_BY_NAME',
                payload: json.data
            })
        }
        catch (error){
            console.log(error)
        }
    }
}

export function getDiets() {
    return async function(dispatch) {
        var info = await axios.get('http://localhost:3001/diets', {}); // obtiene dietas    

        return dispatch({
            type: 'GET_DIETS', 
            payload: info.data});  
    }

}

export function postRecipe(payload){
    return async function(dispatch) {
        var response = await axios.post('http://localhost:3001/recipe', payload); // guarda receta en bd 
        console.log(response)
        return response
    }
}

export function filterRecipeByDiets(payload){
    return{
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByScore(payload){
    return{
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function getRecipeDetail(id){    // obtiene detalles
    return async function(dispatch){
        try{
            var json = await axios.get('http://localhost:3001/recipes//' + id);

            return dispatch ({
                type: 'GET_RECIPE_DETAIL',
                payload: json.data
            })
        }
        catch (error){
            console.log(error)
        }
    }
}
