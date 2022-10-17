import React, { useEffect, useState, useRef} from "react";
import { getRecipes, getDiets, getIpClient} from '../../actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import aniLanding from '../../images/aniLanding.gif';
import './LandingPage.css';


export default function LandingPage0(){

    let id;

    // Necesitamos ref aqui, porque estamos usando
    // setInterval para realizar un seguimiento y
    // detener el temporizador
    const Ref = useRef(null);
    
    const [timer, setTimer] = useState('00:00:00') ;// el estado para mostrar el temporizador
    const [barra, setBarra] = useState("");  // barra de progreso agregado por mi
    const dispatch = useDispatch()
    const history = useHistory()

    const diets = useSelector((state) => state.diets);

    const getTimeRemaining = (e) => { // calcula el tiempo restante
        const total = Date.parse(e) - Date.parse(new Date());   // Tiempo final - Tiempo actual
        const seconds = Math.floor((total / 1000) % 60);        // calcula: seg, min y horas
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 * 60 * 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }

    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {   // Si el temporizador no terminó
                            // actualiza barra y tiempo
            
            setTimer(   // actualiza el temporizador 
                (hours > 9 ? hours : '0' + hours) + ':' +       // verifica si es menor que 10
                (minutes > 9 ? minutes : '0' + minutes) + ':'   // agrega 0 al inicio de cada variable
                + (seconds > 9 ? seconds : '0' + seconds)
            )
            
            var txtBarra = "";  // crea barra de progreso

            for(let i= 0; i< (30 - seconds); i++){
                txtBarra += '|'
            }

            setBarra(txtBarra)   // la asigna

        }

        else{   // Si termino la cuenta, reinicia el contador

            clearTimer(getDeadTime());  // Reinicia la cuenta
            dispatch(getDiets());
        }
    }

    useEffect(() => {      // lanza peticion de dietas al cargar el componente
        dispatch(getDiets())
    }, [dispatch]);

    useEffect(() => { // cuando se carga el componente inicializa el timer
            clearTimer(getDeadTime())
        },[]);
        
    // useEffect(() => {
    //     let now = new Date();
    //     alert( now ); // muestra en pantalla la fecha y la hora actuales
    // }, [])

    const clearTimer = (e) => {  

        // (if se modifica este tambien se debe ajustar la formula de finalizacion"Nota 1")    
        setTimer('00:00:30');   // Inicio del temporizador
        setBarra("");   // Inicio de la barra de progreso
    
        // si se remueve esta linea la actualizacion del timer sera luego de 1 seg
        if (Ref.current) clearInterval(Ref.current);

        id = setInterval(() => {
            startTimer(e);
        }, 1000)
        Ref.current = id;
    }
  
    const getDeadTime = () => {// Aqui se ajusta el valor de la cuenta total del temporizador, 
        let deadline = new Date(); // tiempo actual...

        deadline.setSeconds(deadline.getSeconds() + 30);  // tiempo cuando finalice el timer
                                                          //Se indica el valor que se necesita "Nota 1"

        return deadline;
    }
    
    
    function HandleStart(e) {   // Botón Comenzar
        e.preventDefault();

        dispatch(getIpClient());    // lanza peticion de IP cliente

        if (Ref.current) clearInterval(Ref.current); // apaga el temporizador
        history.push('/home/')

    }


return(
    <div className= "landing">
        <h1 className = 'welcomeMsg'>
            ¿Estás buscando ideas para cocinar?</h1>
        <h1 className = 'welcomeMsg'>¡Este es el lugar indicado! </h1>  
        <div>

            {!diets.length
                ? 
                <>
                <img className='aniLanding' src={aniLanding} alt='aniLanding img'/>
                <h2 className = 'infoMsg'>¡Un momento, por favor... </h2>
                <h2 className = 'infoMsg'>Verificando la disponibilidad de los datos</h2>
                <h2 className = 'barMsg'>{barra}</h2> 
                </>
                : 
                <>
                <h1 className = 'welcomeMsg'>Listo!</h1>
                <button className = 'homeButton'
                    type = 'button'
                    onClick={(e) => HandleStart(e)}>¡Comencemos!
                </button>
                </> } 
        </div>                                                                                     
    </div>
)
}