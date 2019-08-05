import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';
import {connect} from 'react-redux'
import LogInLinks from './LogInLinks';
import LogOutLinks from './LogOutLinks';


const Navigation = ({authUser}) => 
    authUser ? (
        <NavigationAuth authUser={authUser} />

    ) : (
        <NavigationNonAuth/>
    )

const NavigationAuth = (authUser) => (
    <nav>
        <div className="nav-wrapper s12 m6">
            <Link to="/" className="brand-logo"><h1 className="BrandTitle">Itla <span className="BrandTitle-2">Crush</span></h1></Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <LogInLinks/>
        </div>
    </nav>   
)
const NavigationNonAuth = () => (
    <nav>
        <div className="nav-wrapper s12 m6">
            <Link to="/" className="brand-logo"><h1 className="BrandTitle">Itla <span className="BrandTitle-2">Crush</span></h1></Link>
            <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
            <LogOutLinks/>
        </div>
    </nav>
)
const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navigation);