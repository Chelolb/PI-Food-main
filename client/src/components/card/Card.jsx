import React from "react";
import './Card.css';


let prevId = 1;
export default function Card({ image, name, diets, id }) {
   
    return (
        <div className="recipe">
            
            <div>
                <img className="recipeImg" src={image} alt="Imagen Receta"/>
            </div>
            <div>
                <h2 className="recipeName">{name}</h2>            
            </div>
            <div className="dietcointainer">
                {diets?.map(e => {
                    return (
                        <h5 className="diets" key={prevId++}>{e}</h5>
                    )
                })}            
            </div>
        </div>
    )
};
