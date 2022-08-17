import React from "react";
import './Paged.css';

export default function Paged({recipePerPage, allRecipes, paginado}){
    const pageNumbers = [];

    for(let i = 0; i < Math.ceil(allRecipes/recipePerPage); i++){
        pageNumbers.push(i+1);  //paginas a mostrar
    }

    return(
        <div className="fondo">
            <nav className = 'paginacion'>
                <ul className = 'paginas'>
                    {pageNumbers && pageNumbers.map(number => (
                        <li className='pagina' key={number}>
                            <button className="botonPagina" 
                                    key={number} 
                                    onClick={() => paginado(number)}>{number}
                            </button>
                        </li>
                    ))}

                </ul>
            </nav>
        </div>
    )
}