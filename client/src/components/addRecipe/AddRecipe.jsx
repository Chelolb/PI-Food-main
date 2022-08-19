import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from '../../actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import './AddRecipe.css';


function validate(input) {
    let errors = {};
    if (!input.name || input.name.match(/[$%&/()=+-@=,.?¿'¡!"]/)) errors.name = 'Por favor, coloca un nombre válido a esta receta';
    else if (!input.summary) errors.summary = 'Por favor, introduce un comentario acerca de esta receta';
    else if (input.score < 1 || input.score > 100 || isNaN(input.score)) errors.score = 'El Nivel debe ser un número entre 1 and 100';
    else if (input.healthscore < 1 || input.healthscore > 100 || isNaN(input.healthscore)) errors.healthscore = 'El Nivel Saludable debe ser un número entre 1 and 100';
    else if (!input.steps) errors.steps = 'Por favor, detalle los pasos de esta receta';
    else if (!input.diets.length) errors.diets = 'Debe seleccionar al menos un tipo de dieta';
    else if (!input.image) errors.image = 'Debe indicar una imagen a mostrar';
    return errors;
};

export default function AddRecipe(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)

    const [errors, setErrors] = useState({
        vacio:' '
    });
 
    const [input, setInput] = useState({
        name:'',
        summary:'', 
        score:'', 
        healthscore:'',
        steps:'',
        diets: [],
        image:''
    });

    useEffect(() => {
        dispatch(getDiets())
    }, [dispatch]);

    function handleChange(e){   // cambios en textbox
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        setErrors(validate({    // verifica error
            ...input,
            [e.target.name]: e.target.value    
        }))

    }
       
    function handleCheckBox(e) {    // cambios en checkbox
       
        let newArray = input.diets;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }

        setInput({
            ...input,
            diets: newArray
        });
        
        setErrors(validate({    // verifica error
            ...input,
            [e.target.name]: e.target.value    
        }))
   
    }

    function HandleSubmit(e){   // envia al back
        e.preventDefault();
        console.log(input);     // monitor para consola

        if (Object.values(errors).length > 0) {
            alert("Por favor, complete la información solicitada");
        }else{
        dispatch(postRecipe(input)) 

        alert('¡Su receta se ha creado!');

        setInput({
            name:'',
            summary:'', 
            score:'', 
            healthscore:'',
            steps:'',
            diets: [],
            image:''
        })

        history.push('/home')   
        }
    }

    return(
        <div className= 'addRecipe'>
            <form className= 'form' onSubmit={(e) => HandleSubmit(e)}>
                <div className="marcForm1">
                    <div className="headerAdd">
                        <h1 className= 'title'>¡Crea tu propia receta! </h1>
                    </div>
                    <div className="marcFormIz">
                        <div className="item">
                            <label className='label'>Nombre:</label>
                            <input
                                className="inputForm"
                                type = 'text'
                                value = {input.name}
                                name = 'name'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.name && (
                                <p className='errorMsg'>{errors.name}</p>
                            )}
                        </div>
                        <div>
                            <label className='label'>Resumen:</label>
                            <textarea
                                className="inputForm1"
                                type = 'text' rows="5" cols="40"
                                value = {input.summary}
                                name = 'summary'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.summary && (
                                <p className='errorMsg'>{errors.summary}</p>
                            )}
                        </div>
                        <div>
                            <label className='label'>Nivel:</label>
                            <input
                                className="inputForm"
                                type = 'text'
                                value = {input.score}
                                name = 'score'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.score && (
                                <p className='errorMsg'>{errors.score}</p>
                            )}
                        </div>                
                        <div>
                            <label className='label'>Nivel Saludable:</label>
                            <input
                                className="inputForm"
                                type = 'text'
                                value = {input.healthscore}
                                name = 'healthscore'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.healthscore && (
                                <p className='errorMsg'>{errors.healthscore}</p>
                            )}
                        </div>
                        <div>
                            <label className='label'>Imagen:</label>
                            <input
                                className="inputForm"
                                type = 'text'
                                value = {input.image}
                                name = 'image'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.image && (
                                <p className='errorMsg'>{errors.image}</p>
                            )}
                        </div>
                    </div>
                    <div className="marcFormDe">  
                        <div>
                            <label className='label'>Pasos:</label>
                            <textarea
                                className="inputForm2"
                                type = 'text' rows="5" cols="40"
                                value = {input.steps}
                                name = 'steps'
                                onChange={(e) => handleChange(e)}
                            />
                            {errors.steps && (
                                <p className='errorMsg'>{errors.steps}</p>
                            )}
                        </div> 
                        <div className="titleDiet">
                            <label className='titleDiets'>Tipos de dietas:</label>
                        </div>
                        <div className="checkSelect">
                            {diets?.map(d =>{
                                return (
                                    <div key={d.id} className="checks">
                                        <label className="dietTypes">{d.name}</label>
                                        <input className="checks" 
                                                type="checkbox" 
                                                name={d.name} 
                                                value={d.name}  
                                                onChange={e => handleCheckBox(e)}/>
                                    </div>
                                    )
                                })
                            }
                            {errors.diets && (
                                <p className="errorsMsg">{errors.diets}</p>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <Link to= '/home'><button className="goBackButton">Home</button></Link>
                    <button className= 'submitButton' type= 'submit'>Crear Receta</button>
                </div>                                                                                        
            </form>
        </div>
    )
}