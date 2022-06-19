const RecipeFormater = function(id,name,score,image,diets) {
// crea objeto con datos de la receta guardada en bd
let obj = {
    id: id,
    name: name,
    score: score,
    image: image,
    diets: diets,
};

return obj
}

module.exports = RecipeFormater;