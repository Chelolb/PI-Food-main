
const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
    ipClient: []
}

function rootReducer (state = initialState, action){

        switch(action.type){

            case 'GET_RECIPES':
                return{
                    ...state,
                    recipes: action.payload,
                    allRecipes: action.payload   // copia de estado
                }
            case 'GET_RECIPE_BY_NAME':
                return{
                    ...state,
                    recipes: action.payload,
                    allRecipes: action.payload   // copia de estado
                }
            case 'GET_DIETS':
                return{
                    ...state,
                    diets: action.payload
                }
            case 'POST_RECIPE':
                return{
                    ...state,
                }                
            case 'FILTER_BY_DIET':
                const allRecipes = state.allRecipes    // filtro sobre la "copia NO filtrada"
                const dietFiltered = action.payload === 'todas'
                                        ? allRecipes 
                                        : allRecipes.filter(r => r.diets?.some(d => d.toLowerCase() === action.payload.toLowerCase()))
                return{
                    ...state,
                    recipes: dietFiltered
                }
            case 'ORDER_BY_NAME':
                let sortedArr = action.payload === 'atoz' ?
                    state.recipes.sort(function (a, b) {
                        if(a.name > b.name){
                            return 1;
                        }
                        if(b.name > a.name){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.recipes.sort(function (a, b) {
                        if(a.name > b.name){
                            return -1;
                        }
                        if(b.name > a.name){
                            return 1;
                        }
                        return 0;
                    })                    
                return{
                    ...state,
                    recipes: sortedArr
                }
            case 'ORDER_BY_SCORE':
                let sortedArr1 = action.payload === 'asc' ?
                    state.recipes.sort(function (a, b) {
                        if(a.score > b.score){
                            return 1;
                        }
                        if(b.score > a.score){
                            return -1;
                        }
                        return 0;
                    }) :
                    state.recipes.sort(function (a, b) {
                        if(a.score - b.score){
                            return -1;
                        }
                        if(b.score - a.score){
                            return 1;
                        }
                        return 0;
                    })                    
                return{
                    ...state,
                    recipes: sortedArr1
                }
            case 'GET_RECIPE_DETAIL':
                return{
                    ...state,
                    detail: action.payload
                }
            case 'CLEAN_DETAIL':
                let clean = []
                return{
                    ...state,
                    detail: clean
                }
            case 'GET_IP':
                return{
                    ...state,
                    ipClient: action.payload
                }
            default:
                return state;
        }
}

export default rootReducer;