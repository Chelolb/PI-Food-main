import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetail, cleanDetail } from '../../actions/index.js';
import { useHistory } from 'react-router-dom'
import searching from '../../images/searching.gif';
import "./Detail.css";


export default function Detail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const history = useHistory()
    
    
    useEffect(() => {
        dispatch(getRecipeDetail(id))
    }, [dispatch, id]);
    
    
    let recipeDetails = useSelector(state => state.detail);
    

    function Handlesubmit(e){
        e.preventDefault()

        dispatch(cleanDetail())

        history.push('/home/')
    }


    return (

        <div className="details" key={id}>

{/*       {Object.entries(recipeDetails).length ? }  Si ya estan los detalles, se muestran */}
    
        <div className='marcDetail' >
            <h1 className="recipeName">{recipeDetails.name}</h1>
            <div className='marcoInt'>   
                <div className='marcSubInt'>
                    <div className="divimg">
                        <img className="detailImg" 
                        src={recipeDetails.image ? 
                        recipeDetails.image : 
                        searching}
                        alt="Pic not found"/>
                    </div>
                    <div className="ddsh3">
                        <h1 className='simbolScore'>❤</h1>
                        <h1 className='separator'> - </h1>
                        <h1 className="scoreDetal">{recipeDetails.healthscore}</h1>
                    </div>                    
                </div>
                <div className='marcSubInt1'>
                    {recipeDetails.dishTypes ?
                    <div className="ddsh1">
                        <h2 className="deTexts">Tipos de Plato</h2>
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
                        <h2 className="deTexts">Tipos de Dieta</h2>
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
                        <h3 className="deTexts1">Resumen</h3>
                        <div className='contSumary'>
                            <p className="sumarytxt">{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                        </div>
                    </div>
                    <div className="ddsh2">
                        <h3 className="deTexts1">Pasos</h3>
                        <div className='contSteps'>
                            <p className="stepstxt">{recipeDetails.instructions?.replace(/<[^>]*>/g, '')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div> 
            <button className = 'botonBuscar'
                type ='submit'
                onClick={(e) => Handlesubmit(e)}>Volver
            </button>
        </div>
        </div>

    )      
        
}