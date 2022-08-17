import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail } from '../../actions/index.js';
import { Link } from 'react-router-dom'
import "./Detail.css";


export default function Detail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    
    
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]);
    
    
    const recipeDetails = useSelector(state => state.detail);
    
    return (
        
        <div className="details" key={id}>            

        <div className='marcDetail' >
            <h1 className="recipeName">{recipeDetails.name}</h1>
            <div className='marcoInt'>   
                <div className='marcSubInt'>
                    <div className="divimg">
                        <img className="detailImg" 
                        src={recipeDetails.image ? 
                        recipeDetails.image : 
                        'https://images.unsplash.com/photo-1635321593217-40050ad13c74?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1748&q=80'} alt="Pic not found"/>
                    </div>
                    <div className="ddsh1">
                        <h3 className="score">Nivel Saludable: {recipeDetails.healthscore}</h3>
                    </div>                    
                </div>
                <div className='marcSubInt1'>
                    {recipeDetails.dishTypes ?
                    <div className="ddsh1">
                        <h2 className="deTexts">Tipos de Plato: </h2>
                        <div className='contdishes'> 
                        {recipeDetails.dishTypes?.map(e => {
                            return(
                                <h2 className="dishestxt" key={e}>{e}</h2>
                            )
                        })}
                        </div>
                    </div> :
                    <br />
                    }

                    <div className="ddsh1">
                        <h2 className="deTexts">Tipos de Dieta: </h2>
                        <div className='contdiets'>
                        {recipeDetails.diets ? recipeDetails.diets.map(e => {
                            return(
                                <h2 className="dietstxt" key={e}>{e}</h2>
                            )
                        }) :
                        recipeDetails.diets?.map(e => {
                            return(
                                <h2 className="dishesanddiets" key={e.name}>{e.name}</h2>
                            )
                        })}
                        </div>
                    </div>   
                </div>
                <div className='marcSubInt2'>
                    <div className="ddsh2">
                        <h3 className="deTexts1">Resumen: </h3>
                        <p className="summary">{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                    </div>
                    <div className="ddsh2">
                        <h3 className="deTexts1">Pasos: </h3>
                        <p className="steps">{recipeDetails.instructions?.replace(/<[^>]*>/g, '')}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>    
            <Link to="/home"><button className="backButton">Volver</button></Link>
        </div>    
        </div>

    )      
        
}