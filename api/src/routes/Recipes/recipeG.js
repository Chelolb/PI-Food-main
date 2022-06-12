const router = require("express").Router();
const Sequelize = require("sequelize");
const { Recipe, Diet } = require("../../db");
const { recipeNoName, recipeName, recipeId } = require("../axios/recipesAxios");
const { FoCDietG } = require("../controllers/dietFoC");
const Op = Sequelize.Op;
const RecipeFormater = require("../controllers/FormatRecipe");

router.get("/", async function (req, res) {
  let { name } = req.query;

  try {

  if (!name || name === "" || name === " "){  // Busqueda general...

    //... en db  
    let dbResult = await Recipe.findAll({attributes: [],
      include: [
        { model: Diet, attributes: ["name"], through: { attributes: [] } },
      ],
    });
  
    let dbFormated = [];

    dbResult.map((e) => {
      let diets = e["diets"];
      let formated = [];
      diets.map((d) => formated.push(d["name"]));
      let obj = RecipeFormater(e.id, e.name, e.score, e.image, formated);
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
      return res.json({ message: `No se encontraron recetas` });

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
      let obj = RecipeFormater(e.id, e.name, e.score, e.image, formated);
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
              ? res.json({ message: `No se encontraron recetas con palabra clave ${name}`})
              : res.json({ message: `No se encontraron recetas con el criterio buscado`});

    res.json(total);
  } 

  } catch (error) {
    console.log("error in get ");
    res.status(400).json({error: 'Error en lectura listado de Recetas'})
  }
  
});

router.get("/:id/", async function (req, res) {// Busqueda por ID...
  try {
    let { id } = req.params;
    //Las Recetas en BD tiene ID en formato UUIDV4...

    if (
      id.match(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
      )
    ) { // ID tiene formato UUID, busca en bd
      
      let dbResult = await Recipe.findOne({
        where: { id: id },
        include: [
          { model: Diet, attributes: ["name"], through: { attributes: [] } },
        ],
      });
      if (dbResult === null)
        return res.json({ message: "Error buscando por id in DB" });

      let formated = [];
      dbResult.diets.map((e) => formated.push(e["name"]));

      let obj = {
        id: dbResult["id"],
        name: dbResult["name"],
        score: dbResult["score"],
        image: dbResult["image"],
        diets: formated,

        summary: dbResult["summary"],
        healthScore: dbResult["healthScore"],
        steps: dbResult["steps"],
        dishTypes: dbResult["dishTypes"],
      };

      return res.json(obj);
    } else {  // si no tiene formato UUID, busca en API Ex
      
      let apiResult = await recipeId(id);
      return apiResult.length === 0
        ? res.json({ message: "Error buscando por id en API" })
        : res.json(apiResult);
    }
  } catch (error) {
    console.log("error getting by ID",error);
    res.status(400).json({error: 'Error busqueda por ID'})
  }
});

module.exports = router;
