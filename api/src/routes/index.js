const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeG = require('./Recipes/recipeG');
const diets = require('./Diets/diets');
const recipeP = require('./Recipes/recipeP');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipeG)
router.use('/diets', diets)
router.use('/recipe', recipeP)


module.exports = router;
