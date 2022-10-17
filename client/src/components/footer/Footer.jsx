import React from "react";
//import { useState } from "react";
//import {useDispatch} from "react-redux";
//import { getRecipeByName } from "../../actions";
import whatsapp from '../../images/whatsapp.png'
import gmail from '../../images/gmail.png'
import location from '../../images/location.png'
import "./Footer.css";

export default function Footer(){

    return(
        <div className="footer">    
            <div class="contenedor-footer" id="contacto">
                <div class="content-foo">
                    <img class="content-foo img" src={whatsapp} alt="WhatsApp"/>
                    <p>+54 3564 568351</p>
                </div>
                <div class="content-foo">
                    <img class="content-foo img" src={gmail} alt="Gmail"/>
                    <p>marcelolitwin@gmail.com</p>
                </div>
                <div class="content-foo">
                    <img class="content-foo img" src={location} alt="Localización"/>
                    <p>Córdoba-Argentina</p>
                </div>
            </div>
            <div>
                <h2 class="titulo-final">&copy;Marcelo Henry Litwin</h2>
            </div>
        </div>
    )
}