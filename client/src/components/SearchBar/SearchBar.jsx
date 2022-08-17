import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { getRecipeByName } from "../../actions";
import "./SearchBar.css";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function HandleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function Handlesubmit(e){
        e.preventDefault()
        if(!name || !isNaN(name)){
            alert('¡Debe indicar una palabra!');
        }else{
            dispatch(getRecipeByName(name))
            setName('');
        }
    }

    return(
        <div>
            <input
                type ='text'
                placeholder = 'Palabra a buscar...'
                value= {name}
                onChange={(e) => HandleInputChange(e)}>

            </input>
            <button
                className = 'botonBuscar'
                type ='submit'
                onClick={(e) => Handlesubmit(e)}>Buscar
            </button>
        </div>
    )
}