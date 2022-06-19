import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { GetRecipeByName } from "../../actions";
import "./SearchBar.css";

export default function SearchBar(){
    const dispatch = useDispatch()
    const [name, setName] = useState('')
    //const [orden, setOrden] = useState('');

    function HandleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }

    function Handlesubmit(e){
        e.preventDefault()
        dispatch(GetRecipeByName(name))
        setName('');
        //setOrden(`Orden ${e.target.value}`);
    }

    return(
        <div>
            <input
                type ='text'
                placeholder = 'Buscar...'
                onChange={(e) => HandleInputChange(e)}>

            </input>
            <button
                className = 'botonBuscar'
                type ='submit'
                onClick={(e) => Handlesubmit(e)}Buscar>
            </button>
        </div>
    )
}