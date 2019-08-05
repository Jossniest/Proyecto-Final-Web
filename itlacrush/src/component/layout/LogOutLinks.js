import React from 'react';
import {NavLink} from 'react-router-dom';


const LogOutLinks = () => {
    return (
        <div>
        <ul className="right ">
            <li><NavLink to="/login">Iniciar Sesión</NavLink></li>
        </ul>
        </div>
        
        
    )
}
export default LogOutLinks;