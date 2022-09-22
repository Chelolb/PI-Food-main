
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, getDiets, filterRecipeByDiets, orderByName, orderByScore } from '../../actions';
import { Link } from 'react-router-dom';
import Card from '../card/Card.jsx';
import Paged from '../paged/Paged';
import SearchBar from '../searchBar/SearchBar';
import loading from '../../images/loading.gif';
import './Home.css';


export default function Home( props ) {

    //console.log(props);
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const diets = useSelector((state) => state.diets);
    const [order, setOrder] = useState('');
    const[currentPage, setCurrentPage] = useState(1);
    
    const[recipePerPage, setRecipePerPage] = useState(9);   // cant. recetas x Pag
    const indexOfLastRecipe = currentPage * recipePerPage   // ind ultima Pag
    const indexOfFirstRecipe = indexOfLastRecipe - recipePerPage // ind primer Pag

    let currentRecipes = [];
    if (allRecipes.length){
    currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
    }

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    
    useEffect(() => {      // obtiene dietas al cargar home
        dispatch(getDiets())
    }, [dispatch]);


    // useEffect (()=>{    // obtiene recetas al cargar home
    //     dispatch(getRecipes())
    //     },[dispatch])


    function handleClick(e) {   // Boton refresh
        e.preventDefault();
        dispatch(getRecipes());
    }


    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(filterRecipeByDiets(e.target.value))
        setCurrentPage(1);
    }

    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(orderByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }
    
    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(orderByScore(e.target.value));
        setCurrentPage(1);
        setOrder(`Order ${e.target.value}`);
    }


    return (
        <div className='home'>
            <div className='header'>
                <div className='grupo0'>
                    <Link to= '/recipe'><button className='addButton'>Nueva Receta</button></Link>
                    <h1 className='titleHome'>La fuente de placer para su paladar</h1>
                    <button className='refreshButton' onClick={e => {handleClick(e)}}>
                    Recargar Recetas
                    </button>
                </div>
                <div className='grupo1'>
                    <select defaultValue = 'Alfabético' className="select" name="Alfabetico" onChange={e => handleAlphabeticalSort(e)}>
                            <option disabled>Alfabético</option>
                            <option value ='atoz'>A a Z</option>
                            <option value ='ztoa'>Z a A</option>
                    </select>
                    <select defaultValue = 'Puntaje' className="select" name="Numérico" onChange={e => handleScoreSort(e)}>
                            <option disabled>Puntaje</option>
                            <option value ='asc'>Desde Min a Max</option>
                            <option value ='desc'>Desde Max a Min</option>
                    </select>
                    <select  defaultValue = 'Todas' className="select" name="diets" onChange={e => handleDietTypeFilter(e)}>
                    <option value ='todas'>Todas</option>

                    {!diets.length ?
                        <>
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
                        </>
                        :
                        diets.map(d => {       // mapea las opciones de dietas para el select
                                    return (
                                            <option key={d.id} value={d.name}>{d.name}</option>
                                        )
                                    })
                        }      
                    </select>
                    <SearchBar/>                   {/* barra de busqueda */}
                </div>
                <div>
                    <Paged                         // paginado
                        recipePerPage ={recipePerPage}
                        allRecipes = {allRecipes.length}
                        paginado = {paginado}
                    />
                </div>
            </div>
        <div className ="allrecipes">
        {!allRecipes.length ?
        (allRecipes.msg?
            <div>
                <h1>{allRecipes.msg}</h1>
            </div>  :
                <img className='loading' src={loading} alt='Loading img'/>)
            :
            currentRecipes?.map((e) => {    // despliege de recetas
                return(
                <div key = {e.id}>
                <Link className="linkRecetas" to={`/home/${e.id}`}>      
                    <Card  
                        key = {e.id}
                        id = {e.id} 
                        image = {e.image} 
                        name ={e.name}  
                        diets = {e.diets} 
                        score = {e.score}
                    />
                </Link>
                </div>
                ); 
            }) 
            }
        </div>
        </div>

    )
}