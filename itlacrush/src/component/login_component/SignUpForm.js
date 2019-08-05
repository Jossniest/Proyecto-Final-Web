import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import { compose } from 'redux';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { withFirebase } from '../../config/fire';


const formValid = formError => {
    let validado = true;
    Object.values(formError).forEach(val => {
        val.length > 0 && (validado = false)

    })
    return validado
}

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email ya siendo usado';

const ERROR_MSG_ACCOUNT_EXISTS = `
  Una Cuenta con este email ya existe.
  Pruebe iniciar sesion con este email.
  Si cree que la cuenta esta siendo usada por algun otro usuario, 
  pruebe introduciendo otro email diferente
`;
const init_state = {
    
        name: '',
        lastname: '',
        user: '' ,
        email: '',
        password: '',
        repassword: '',
        error: null,
        formError: {
            name: '',
            lastname: '',
            user: '' ,
            password: '',
            repassword: '', 
            email: ''
        }
}

class SignUpFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...init_state
            
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        e.preventDefault();
        const { name, value} = e.target;
        let formError = this.state.formError;
        switch (name){
            case 'name':
                formError.name = value.length < 3 && value.length > 0 ? 
                "Este campo es obligatorio, minimo 3 caracteres": "";
                break;
            case 'lastname': 
                formError.lastname = value.length < 3 && value.length > 0 ? 
                    "Este campo es obligatorio, minimo 3 caracteres": "";
                break;
            case 'user': 
                formError.user = value.length < 3 && value.length > 0 ? 
                    "Este campo es obligatorio, minimo 3 caracteres": "";
                break;
            case 'email': 
                formError.email = value.length < 8 && value.length > 0 ? 
                    "Introduzca un email real para poder crearse su cuenta": "";
                break;
            case 'password': 
                formError.password = value.length < 6 && value.length > 0 ? 
                    "Este campo es obligatorio, minimo 6 caracteres": "";
                break;
            case 'repassword': 
                formError.repassword = value.length < 6 && value.length > 0 ? 
                    "Este campo es obligatorio, minimo 6 caracteres": "";
                break;
            default:
                break;
        }
        this.setState({formError, [name]: value})
    }
    handleSubmit(e){
       
        const {user, name, lastname, email, password} = this.state
        
        this.props.firebase.doCreateUserWithEmailAndPassword(email, password).then(authUser => {
          return this.props.firebase.user(authUser.user.uid).set({
              name,
              lastname,
              user,
              email,

          });
        })
        .then(()=>{
            this.setState({...init_state});
            this.props.history.push('/home')
        }).catch(error =>{
            if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
              }
      
              this.setState({ error });
        })
        
        e.preventDefault(); 
        
    }  
    render(){
        const {formError} = this.state;
        const { user, name, lastname, password, repassword, email, error} = this.state
        const {authUser} = this.props;
        if(authUser) return <Redirect to="/"></Redirect>

        const isInvalid = 
        password !== repassword;
        return(
            <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                    <div className="FormField">
                        <label className="FormField__Label">Nombre</label>
                        <input type='text' id="nombre" className="FormField__Input" placeholder="Escriba su nombre" name="name"
                        value={this.state.name} onChange={this.handleChange}></input>
                        <p className="text-danger font-weight-light">{formError.name.length > 0 && formError.name}</p>     
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Apellido</label>
                        <input type='text' id="apellido" className="FormField__Input" placeholder="Escriba su apellido" name="lastname"
                        value={this.state.lastname} onChange={this.handleChange}></input>
                        <p className="text-danger font-weight-light">{formError.lastname.length > 0 && formError.lastname}</p> 
                                     
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Usuario</label>
                        <input type='text' id="usuario" className="FormField__Input" placeholder="Escriba su usuario" name="user"
                        value={this.state.user} onChange={this.handleChange}></input>
                        <p className="text-danger font-weight-light">{formError.user.length > 0 && formError.user}</p> 
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Email</label>
                        <input type='text' id="email" className="FormField__Input" placeholder="Escriba su email" name="email"
                        value={this.state.email} onChange={this.handleChange}></input>
                        <p className="text-danger font-weight-light">{formError.email.length > 0 && formError.email}</p> 
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Contraseña</label>
                        <input type='password' id="clave" className="FormField__Input" placeholder="Escriba su contraseña" name="password"
                        value={this.state.password} onChange={this.handleChange}></input>
                        <p className="text-danger font-weight-light">{formError.password.length > 0 && formError.password}</p> 
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label">Confirmar Contraseña</label>
                        <input type='password' id="clave_auth" className="FormField__Input" placeholder="Confirme su contraseña" name="repassword"
                        value={this.state.repassword} onChange={this.handleChange}></input>
                        <p className="text-danger font-weight-light">{formError.repassword.length > 0 && formError.repassword}</p> 
                    </div>

                    <div className="FormField">
                        <button disabled={isInvalid} className="FormField__Button mr-20">Resgistrarse</button>
                        <Link to='/sign-in' className="FormField__Link">Ya me he registrado</Link>
                    </div>
                    {error && <p>{error.message}</p>}
                    
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
});
const SignUpForm = compose(withRouter,withFirebase,connect(mapStateToProps))(SignUpFormBase);

export default SignUpForm;