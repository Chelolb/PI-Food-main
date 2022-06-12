const RecipeFormater = function(id,name,score,image,diets) {
// crea objeto con datos de la receta
let obj = {
    id: id,
    name: name,
    image: image,
    score: score,
    diets: diets,
};

return obj
}

module.exports = RecipeFormater;