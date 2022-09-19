const router = require("express").Router();
const Sequelize = require("sequelize");
const { Recipe, Diet } = require("../../db");
const { recipeId } = require("../axios/recipesAxios");
const Op = Sequelize.Op;


router.get("/:id", async function (req, res) {// Busqueda por ID...

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
          return res.json({ msg: "Error buscando por id in DB" });
  
        let formated = [];
        dbResult.diets.map((e) => formated.push(e["name"]));
  
        let obj = {
          id: dbResult["id"],
          name: dbResult["name"],
          score: dbResult["score"],
          image: dbResult["image"],
          diets: formated,
          instructions: dbResult["steps"],
          summary: dbResult["summary"],
          healthscore: dbResult["healthscore"],
          steps: dbResult["steps"],
          dishTypes: dbResult["dishTypes"],
        };
  
        return res.json(obj);
      } else {  // si no tiene formato UUID, busca en API Ex
        
        let apiResult = await recipeId(id);
        return apiResult.length === 0
          ? res.json({ msg: "Error buscando por id en API" })
          : res.json(apiResult);
      }
    } catch (error) {
      console.log("error buscando por ID",error);
      res.status(400).json({msg: 'Error busqueda por ID'})
    }
  });

  
module.exports = router