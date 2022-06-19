import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, FilterRecipeByDiets, OrderByName, OrderByScore } from '../actions';
import { Link } from 'react-router-dom';
import Card from './card/Card.jsx';
import Paged from './paged/Paged';
import SearchBar from './SearchBar/SearchBar';


export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [order, setOrder] = useState('');
    const[currentPage, setCurrentPage] = useState(1);
    const[recipePerPage, setRecipePerPage] = useState(9);   // cant. recetas x Pag
    const indexOfLastRecipe = currentPage * recipePerPage   // ind ultima Pag
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage // ind primer Pag
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    useEffect (()=>{    // obtiene recetas al cargar
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
    }

    
    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(FilterRecipeByDiets(e.target.value))
        setCurrentPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(OrderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(OrderByScore(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }


    return (
        <div>
            <Link to= '/recipe'><button>Nueva Receta</button></Link>
            <h1>La fuente de placer para su paladar</h1>
            <button onClick={e => {handleClick(e)}}>
              Volver a cargar todos los componentes
            </button>
            <SearchBar/>                   {/* barra de busqueda */}
        <div>
            <select className="select" name="Alfabetico" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alphabetical</option>
                    <option value ='atoz'>A to Z</option>
                    <option value ='ztoa'>Z to A</option>
            </select>
            <select className="select" name="Numérico" onChange={e => handleScoreSort(e)}>
                    <option disabled selected>Score</option>
                    <option value ='asc'>From Min to Max</option>
                    <option value ='desc'>From Max to Min</option>
            </select>
            <select className="select" name="diets" onChange={e => handleDietTypeFilter(e)}>
                    <option value ='todas'>Todas</option>
                    <option value ='gluten free'>Gluten Free</option>
                    <option value ='ketogenic'>Ketogenic</option>
                    <option value ='vegetarian'>Vegetarian</option>
                    <option value ='lacto vegetarian'>Lacto Vegetarian</option>
                    <option value ='ovo vegetarian'>Ovo Vegetarian</option>
                    <option value ='lacto ovo vegetarian'>Lacto Ovo Vegetarian</option>
                    <option value ='vegan'>Vegan</option>
                    <option value ='pescatarian'>Pescatarian</option>
                    <option value ='paleolithic'>Paleo</option>
                    <option value ='primal'>Primal</option>
                    <option value ='fodmap friendly'>Fodmap Friendly</option>
                    <option value ='whole 30'>Whole30</option>
                    <option value ='dairy free'>Dairy Free</option>
            </select>
        </div>
            <Paged                         // paginado
                recipePerPage ={recipePerPage}
                allRecipes = {allRecipes.length}
                paginado = {paginado}
            />
        
        <div className ="allrecipes">
        {!currentRecipes.length ?
                <img className='loading' src='' alt='Loadingimg'/>
            :
           
            currentRecipes?.map((e) => {    // despliege de recetas
                return(
                <Fragment>
                      
                    <Card  id = {e.id} image = {e.image} name ={e.name}  diets = {e.diets} score = {e.score}/>
            
                </Fragment>
                );
            })
            }
        </div>
        </div>

    )
}