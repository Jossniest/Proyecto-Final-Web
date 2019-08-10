import React from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav,} from 'react-bootstrap'

const LogOutLinks = () => {
    return (
        <Nav className="mr-auto">
            <Nav.Link><NavLink to="/login">Iniciar Sesión</NavLink></Nav.Link>
        </Nav> 
    )
}
export default LogOutLinks;