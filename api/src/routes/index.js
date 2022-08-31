const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeG = require('./Recipes/recipeG');
const recipeD = require('./Recipes/recipeD');
const diets = require('./Diets/diets');
const recipeP = require('./Recipes/recipeP');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes/name', recipeG)
router.use('/recipes/detail', recipeD)
router.use('/diets', diets)
router.use('/recipe', recipeP)


module.exports = router;
