import React from "react";
import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className = 'landing'>
            <h1 className = 'welcomeMsg'>
                ¿Estás buscando ideas para cocinar? ¡Este en el lugar indicado!
            </h1>
            <Link to='/home' id="click">
                <button className = 'homeButton'>¡Comencemos!</button>
            </Link>
        </div>
    )
}