import React from "react";
import './Card.css';


let prevId = 1;
export default function Card({id, image, name, diets, score }) {
   
    return (
        <div className="recipe">
            
            <div>
                <img className="recipeImg" src={image} alt="Imagen Receta"/>
            </div>
            <div>
                <h2 className="recipeName">{name}</h2>            
            </div>
            <div>
                <h2 className="recipeScore">Nivel: {score}</h2>            
                <h2 className= 'titleDiets'> Tipos de Dietas </h2>
            </div>
            <div className="dietcointainer">
                {diets?.map(e => {
                    return (
                        <p className="diets" key={prevId++}>{e}</p>
                    )
                })}            
            </div>
        </div>
    )
};
