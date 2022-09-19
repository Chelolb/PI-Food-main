const router = require("express").Router();
const Sequelize = require("sequelize");
const { Recipe, Diet } = require("../../db");
const { recipeNoName, recipeName } = require("../axios/recipesAxios");
const { FoCDietG } = require("../controllers/dietFoC");
const Op = Sequelize.Op;
const RecipeFormater = require("../controllers/FormatRecipe");

//router.get("/", async function (req, res) {
router.get("/", async function (req, res) {
  let { name } = req.query;

  try {

  if (!name || name === "" || name === " "){  // Busqueda general...

    //... en db  
    let dbResult = await Recipe.findAll({attributes: ['id', 'name', 'summary', 'score', 'healthscore', 'steps', 'image'],
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });
  
    let dbFormated = [];

    dbResult.map((e) => {
      let diets = e["diets"];
      let formated = [];
      diets.map((d) => formated.push(d["name"]));
      let obj = RecipeFormater(e.id, e.name, e.score, e.image, formated, e.creadoPor);
      dbFormated.push(obj);
    });

    //... en API
    let apiResult = await recipeNoName();

    let total

    if (apiResult == null) {  // Si no hay Receta del sitio
      //message: `No se encontraron recetas en el Sitio`
      total = dbFormated

    }else { // Si consigue Recetas
      //agrega dietas a bd
      FoCDietG(apiResult);

      //total recibe hasta 100 recetas del sitio + el total de DB
      total = dbFormated.concat(apiResult);

    }

    if (total.length === 0)
      return res.json({ msg: `No se encontraron recetas` });

    res.json(total);

  }
  else{  // // Busqueda por nombre...

    //en db 
    let dbResult = await Recipe.findAll({
      where: { name: { [Op.like]: `%${name}%` } },
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });

    let dbFormated = [];

    dbResult.map((e) => {
      let diets = e["diets"];
      let formated = [];
      diets.map((d) => formated.push(d["name"]));
      let obj = RecipeFormater(e.id, e.name, e.score, e.image, formated, e.creadoPor);
      dbFormated.push(obj);
    });
  
    //en API
    let apiResult = await recipeName(name);

    let total

    if (apiResult == null) {  // Si no encuentra recetas
      //mensaje: `No se encontraron recetas con palabra clave ${name}`
      total = dbFormated
    
    } else {  // si consigue recetas
      //agrega dietas to DB
      FoCDietG(apiResult);

      //total recibe hasta 100 resultados del sitio + resultados de bd
      total = dbFormated.concat(apiResult);

    }

    //Si no hay recetas con la palabra
    if (total.length === 0)
      return  name !== null
              ? res.json({ msg: `No se encontraron recetas con palabra clave ${name}`})
              : res.json({ msg: `No se encontraron recetas con el criterio buscado`});

    res.json(total);
  } 

  } catch (error) {
    console.log("error in get ");
    res.status(400).json({msg: 'Error en lectura listado de Recetas'})
  }
  
});


module.exports = router;
