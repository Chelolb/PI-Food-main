import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipes} from '../../actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import aniLanding from '../../images/aniLanding.gif';
import './LandingPage.css';


export default function LandingPage0(){
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes);


    useEffect (()=>{    // obtiene recetas al cargar home
        dispatch(getRecipes())
        },[dispatch])

return(
    <div className= "landing">
        <h1 className = 'welcomeMsg'>
            ¿Estás buscando ideas para cocinar?</h1>
        <h1 className = 'welcomeMsg'>¡Este es el lugar indicado! </h1>  
        <div>

            {!allRecipes.length
                ? 
                <>
                <img className='aniLanding' src={aniLanding} alt='aniLanding img'/>
                <h1 className = 'welcomeMsg'>¡Un momento, por favor... </h1>
                <h1 className = 'welcomeMsg'>Verificando la disponibilidad de los datos</h1>  
                </>
                : 
                <>
                <Link to='/home' id="click">
                    <button className = 'homeButton'>¡Comencemos!</button>
                </Link>
                <h1 className = 'welcomeMsg'>Listo!</h1>
                </> } 
        </div>                                                                                     
    </div>
)
}