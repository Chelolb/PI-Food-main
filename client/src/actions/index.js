import axios from 'axios';
const ROUTE = 'http://localhost:3001'


export function getRecipes() {
    return async function(dispatch) {
        try{
            var json = await axios.get(ROUTE + '/recipes/name/'); // obtiene recetas en general
        
            return dispatch({
                type: 'GET_RECIPES', 
             payload: json.data
            })   
        }
        catch (error){
            console.log(error)
        }   
    }
}

export function getRecipeByName(name){   // obtiene recetas por nombre
    return async function(dispatch){
        try{
            var json = await axios.get(ROUTE + '/recipes/name?name=' + name);

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

export function getDiets() {        ; // obtiene dietas 
    return async function(dispatch) {
        try{
            var info = await axios.get(ROUTE + '/diets', {})   

            return dispatch({
                type: 'GET_DIETS', 
                payload: info.data
            });            
        }   
        catch (error){
            console.log(error)
        } 
    }

}

export function cleanDetail(){
    return{
        type: 'CLEAN_DETAIL',
        //payload
    }
}

export function postRecipe(payload){            // guarda receta en bd
    return async function(dispatch) {
        try{
            var response = await axios.post(ROUTE + '/recipe', payload);  
            console.log(response)
            return response; 
        }
        catch (error){
            console.log(error)
        } 
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
            var json = await axios.get(ROUTE + '/recipes/detail/' + id);

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
