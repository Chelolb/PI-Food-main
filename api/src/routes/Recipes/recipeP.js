const router = require('express').Router();
const Sequelize = require('sequelize');
const { Recipe, Diet } = require('../../db');
// const {FoCDietP} = require('../controllers/dietFoC');
const Op = Sequelize.Op;



router.post('/', async (req,res) => {
    try {
    let {name, summary, score, healthscore, steps, image, diets} =req.body;
    
    if(!name || !summary) return res.status(422).json({message: 'Nombre y Resumen es necesario'});
    if(score < 0 || score > 100) return res.status(422).send({message: 'score debe estar entre 0 -100'})
    if(healthscore < 0 || healthscore > 100) return res.status(422).json({message:'healtScore debe estar entre 0 -100'})
    score = score ? score : 0
    healthscore = healthscore ? healthscore : 0
    image=== null 
            ? 'https://dclgroup.com.ar/wp-content/themes/unbound/images/No-Image-Found-400x264.png'
            : image


    let newRecipe = await Recipe.create({
        name,
        summary, 
        score:score, 
        healthscore:healthscore,
        steps,
        image,
    })
    
let formated= Array.isArray(diets) ? diets: [diets]

    const matchingDiets = await Diet.findAll({
        where: {
            name: {
                [Op.in] : formated
            }
        }
    }) 

 await newRecipe.setDiets(matchingDiets)

    res.status(201).json(newRecipe)
    } catch (error) {
        console.log('ERROR haciendo POST de Recetas', error)
        res.status(400).json({msg: 'Error en registro de Receta en Base de Datos'})
    }
    
})



module.exports = router