import React from 'react';
import SignOut from '../login_component/SignOut'
import {NavLink} from 'react-router-dom';


const LogInLinks = () => {
    return (
        <div>
        <ul className="right">
            <li><NavLink to="/new-publication">Nueva Declaración</NavLink></li>
            <li><SignOut/></li>          
        </ul>
      </div>
        
    )
}
export default LogInLinks;