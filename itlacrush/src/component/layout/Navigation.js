import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import {connect} from 'react-redux'
import LogInLinks from './LogInLinks';
import LogOutLinks from './LogOutLinks';

import {Navbar, Nav,} from 'react-bootstrap'

const Navigation = ({authUser}) => 
    authUser ? (
        <NavigationAuth authUser={authUser} />

    ) : (
        <NavigationNonAuth/>
    )

const NavigationAuth = (authUser) => {
    
    return(
    
    <Navbar sticky="top" collapseOnSelect expand="sm" bg="pink" variant="dark" className="w-100 bd-highlight">
        <Navbar.Brand><Link to="/"><h1 className="BrandTitle">Itla <span className="BrandTitle-2">Crush</span></h1></Link></Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav" >  
                <LogInLinks/>
        </Navbar.Collapse>
        <Navbar.Brand><h2 >{authUser.authUser.user}</h2></Navbar.Brand>
        
    </Navbar> 
      
)}
const NavigationNonAuth = () => (
    <Navbar collapseOnSelect expand="lg" bg="pink" variant="dark">
        <Navbar.Brand><Link to="/"><h1 className="BrandTitle">Itla <span className="BrandTitle-2">Crush</span></h1></Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav" >  
                <LogOutLinks/>
        </Navbar.Collapse>
    </Navbar>
)
const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navigation);