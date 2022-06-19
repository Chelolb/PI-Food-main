import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postRecipe, getDiets } from '../actions/index.js'
import { useDispatch, useSelector } from "react-redux";

export default function AddRecipe(){
    const dispatch = useDispatch()
    const history = useHistory()
    const diets = useSelector((state) => state.diets)
 
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
    }, []);

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })

        console.log(input);     // control
    }
       
    function handleCheckBox(e) {
       
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
            
        console.log(input);    // control    
    }

    function HandleSubmit(e){
        e.preventDefault();
        console.log(input); // control

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

    return(
        <div>
            <Link to= '/home'><button>Home</button></Link>
            <h1>¡Crea tu propia receta!</h1>
            <form onSubmit={(e) => HandleSubmit(e)}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type = 'text'
                        value = {input.name}
                        name = 'name'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Resumen:</label>
                    <input
                        type = 'text'
                        value = {input.summary}
                        name = 'summary'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                   <div>
                    <label>Nivel:</label>
                    <input
                        type = 'text'
                        value = {input.score}
                        name = 'score'
                        onChange={(e) => handleChange(e)}
                    />
                </div>                
                <div>
                    <label>Nivel Saludable:</label>
                    <input
                        type = 'text'
                        value = {input.healthscore}
                        name = 'healthscore'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Pasos:</label>
                    <input
                        type = 'text' rows="4" cols="40"
                        value = {input.steps}
                        name = 'steps'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                        type = 'text'
                        value = {input.image}
                        name = 'image'
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className="checkSelect">
                    <label className="msgs">Tipos de dietas:</label>
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
    {/*                    {errors.diet && (
                            <span className="errors">{errors.dietTypes}</span>
                        )}  */}
                </div>
                <div>
                    <button type= 'submit'>Crear Receta</button>
                </div>                                                                                         
            </form>
        </div>
    )
}