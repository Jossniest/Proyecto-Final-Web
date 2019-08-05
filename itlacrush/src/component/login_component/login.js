import React, {Component} from 'react';
import './Login.css'
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import fireIcon from '../../resources/firebase-icon.png'
import reactIcon from '../../resources/react-icon.png'

class Login extends Component{
    render(){
        return(
        <Router>
        <div className="Login">
            <div className="Login_Aside">
                <h1 className="BrandTitle">Itla <span className="BrandTitle-2">Crush</span></h1>
                <h5 className="text-secondary font-italic font-weight-lighter"><em>Uniendo los corazones de los itlasianos</em></h5>              
                <div className="info_box text-dark d-flex flex-column align-items-center">
                <p className="text-uppercase font-weight-bold text-justify">Al unirte recibes los siguientes beneficios</p>
                <ul>
                    <li>Publicar declaraciones</li>
                    <li>Recibir declaraciones</li>
                    <li>Darles favoritos</li>                    
                </ul>
                <h2 style={{marginBottom:"70px"}}>¡Comienza ya!</h2>
                </div>
                <div className="text-dark font-weight-light ">
                <h6>Powered By</h6>
                <img src={fireIcon} alt="fire-icon" className="icon"></img>
                <img src={reactIcon} alt="react-icon" className="icon"></img>
                <h6>Created By <cite>Jossniest</cite></h6>
                </div>       
            </div>

            <div className="Login_Form">
                <div className="TabPage">
                    <NavLink to="/sign-in" activeClassName="TabPage_Item--Active" className="TabPage_Item">Iniciar Sesión</NavLink>
                    <NavLink to="/login" activeClassName="TabPage_Item--Active" className="TabPage_Item">Registrarse</NavLink>
                </div>
                <div className="FormTitle">
                    <NavLink to="/sign-in" activeClassName="FormTitle_Link--Active" className="FormTitle_Link">Iniciar Sesión</NavLink> or 
                    <NavLink to="/login" activeClassName="FormTitle_Link--Active" className="FormTitle_Link">Registrarse</NavLink>
                </div>
                <Route path="/login" component={SignUpForm}>
                </Route>
                <Route path="/sign-in" component={SignInForm}>  
                </Route>
            </div> 
        </div>
    
        </Router>
        )
    }
}

export default Login;