import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getDiets } from '../../actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import aniLanding from '../../images/aniLanding.gif';
import './LandingPage.css';


export default function LandingPage0(){
    const dispatch = useDispatch()
    //const history = useHistory()
    const diets = useSelector((state) => state.diets)

    
    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);


return(
    <div className= "landing">
        <h1 className = 'welcomeMsg'>
            ¿Estás buscando ideas para cocinar?</h1>
        <h1 className = 'welcomeMsg'>¡Este es el lugar indicado! </h1>  
        <div>
            {!diets 
                ? 
                <img className='aniLanding' src={aniLanding} alt='aniLanding img'/>
                : 
                <Link to='/home' id="click">
                    <button className = 'homeButton'>¡Comencemos!</button>
                </Link> } 
        </div>                                                                                     
    </div>
)
}