const router = require('express').Router();
const Sequelize = require('sequelize');
const { Diet } = require('../../db');
const Op = Sequelize.Op;


router.get('/', async function(req,res) {
    try {    
    let dbResult = await Diet.findAll({attributes: ['id', 'name']})
    
    res.json(dbResult)
    }
    catch (error) {
        console.log("error in get diets", error);
        res.status(400).json({error: 'Error en lectura listado de dietas de Base de Datos'})
    }
});

// const dietTypesDb = ['gluten free', 'ketogenic', 'vegetarian', 'lacto vegetarian','ovo vegetarian',
// 'vegan', 'pescetarian', 'paleolithic', 'primal', 'low fodmap', 'whole 30'];


module.exports = router