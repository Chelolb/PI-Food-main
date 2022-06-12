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