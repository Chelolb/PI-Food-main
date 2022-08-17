import React from "react";
import './Card.css';


let prevId = 1;
export default function Card({id, image, name, diets, score }) {
   
    return (
        <div className="card">   
            <div>
                <img className="cardImg" src={image} alt="Imagen Receta"/>
            </div>
            <div>
                <h1 className="cardName">{name}</h1>
            </div>
            <div>
                <p className="cardScore">Nivel: {score}</p>
            </div>
            <div>            
                <p className="cardTitleDiets">Tipos de Dietas</p>
            </div>
            <div className="contDiets">
                {diets?.map(e => {
                    return (
                        <p className="cardTxtDiets" key={prevId++}> - {e} - </p>
                    )
                })}            
            </div> 
        </div>
    )
};
