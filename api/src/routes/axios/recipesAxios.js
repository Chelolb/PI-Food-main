const axios = require("axios").default;
const { API_KEY } = process.env;
const RecipeFormater = require("../controllers/FormatRecipe");

//Busca recetas en general
async function recipeNoName() {
  try {
    let result = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&number=20&apiKey=${API_KEY}`
      );
    let resolve = [];
    if (result.data.results) {
      result.data.results.map((item) => {
        let obj = RecipeFormater(
          item.id,
          item.title,
          //item.spoonacularScore,
          item.healthScore,
          item.image,
          item.diets
        );
        resolve.push(obj);
      });
      return resolve;
    }
  } catch (error) {
    console.log("error in axios No name");
    res.status(400).json({error: 'Error busqueda ApiEx en general'})
  }
}

//Busca recetas segun nombre
async function recipeName(name) {
  try {
    let result = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&addRecipeInformation=true&number=20&apiKey=${API_KEY}`
      );
    let resolve = [];
    if (result.data.results) {
      result.data.results.map((item) => {
        let obj = RecipeFormater(
          item.id,
          item.title,
          //item.spoonacularScore,
          item.healthScore,
          item.image,
          item.diets
        );
        resolve.push(obj);
      });
      return resolve;
    }
  } catch (error) {
    console.log("error in axios by name");
    res.status(400).json({error: 'Error busqueda ApiEx por palabra'})
  }
}

// obtiene info detalle de la receta
async function recipeId(id) {
  try {
    
  
  let item = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
  );
  let data = item.data;

  const dietList = [...data.diets];
  data.vegetarian && dietList.push("vegetarian");
  data.vegan && dietList.push("vegan");
  data.glutenFree && dietList.push("gluten free");

  let filtered = [...new Set(dietList)];

  let stepsFormated = [];
  data.analyzedInstructions.map((item) => {
    let nested = [];
    item.steps.map((step) => {
      nested.push([step.number, step.step]);
    });
    stepsFormated.push([item.name, nested]);
    return nested;
  });

  const text = data.summary.replace(/<[^>]+>/g, "");

  let obj = {
    name: data.title,
    id: data.id,
    image: data.image,
    summary: text,
    dishTypes: data.dishTypes,
    diets: filtered,
    healthScore: data.healthScore,
    score: data.spoonacularScore,
    steps: stepsFormated,
  };

  return obj;
} catch (error) {
    console.log('error axios by id')
    res.status(400).json({error: 'Error busqueda ApiEx por ID'})
    return []
}
}

module.exports = {
  recipeNoName,
  recipeName,
  recipeId,
};
