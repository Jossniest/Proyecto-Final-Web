import React from 'react';
import SignOut from '../login_component/SignOut'
import {NavLink} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap'
import {connect} from 'react-redux'
import {withFirebase} from '../../config/fire'
import {compose} from 'redux'
import 'bootstrap/dist/css/bootstrap.css';

const LogInLinks = (props) => {
    
    return (
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link><NavLink to="/new-publication">Nueva Declaración</NavLink></Nav.Link>
            <Nav.Link><SignOut/></Nav.Link> 
            
        </Nav>  
        
        </Navbar.Collapse>
    )
}

const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
  });


export default compose(withFirebase, connect(mapStateToProps))(LogInLinks);