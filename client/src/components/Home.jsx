import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paged from './paged/Paged';


export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const[currentPage, setCurrentPage] = useState(1);
    const[recipePerPage, setRecipePerPage] = useState(9);   // cant. recetas x Pag
    const indexOfLastRecipe = currentPage * recipePerPage   // ind ultima Pag
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage // ind primer Pag
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (()=>{
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }


    return (
        <div>
            <Link to= '/recipe'>Crear Receta</Link>
            <h1>La fuente de placer para su paladar</h1>
            <button onClick={e => {handleClick(e)}}>
              Volver a cargar todos los componentes
            </button>
        <div>
            <select name = 'Alfabetico'>
                <option disabled selected>Alfabético</option>
                <option value = 'asc'>Ascendente</option>
                <option value = 'des'>Descendente</option>
            </select>
            <select name = 'Numerico'>
                <option disabled selected>Puntos</option>
                <option value = 'asc'>Ascendente</option>
                <option value = 'des'>Descendente</option>
            </select>
            <select className="select" name="diets">
                    <option disabled selected>Select...</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
            </select>
            <Paged                         // paginado
                recipePerPage ={recipePerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
            />
            {currentRecipes?.map((e) =>{    // despliege de recetas
                return(
                <Fragment>
                      
                    <Card  id = {e.id} image = {e.image} name ={e.name}  diets = {e.diets}/>
            
                </Fragment>
                );
            })
                
        }
        </div>
        </div>

    )
}