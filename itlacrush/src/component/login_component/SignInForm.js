import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import { withFirebase } from '../../config/fire';

const INITIAL_STATE = {
    email: '' ,
    password: '',
    error: null
}
const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/La cuenta existe con diferentes credenciales';



class SignInFormBase extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e){
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;
        this.setState({
           [name] : value 
        })
    }
    handleSubmit(e){
        
        const { email, password } = this.state;
        
        this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({ error });
          });
          e.preventDefault();
        }     

    render(){
        const {authUser} = this.props;
        if(authUser) return <Redirect to="/"></Redirect>
        const { email, password, error } = this.state;

        const isInvalid = password === '' || email === '';
        return(
        <div className="FormCenter">
            <form className="FormFields" onSubmit={this.handleSubmit}>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="email">Email</label>
                    <input type='text' id="email" className="FormField__Input" placeholder="Escriba su email" name="email"
                    value={this.state.email} onChange={this.handleChange}></input>
                     
                </div>
                <div className="FormField">
                    <label className="FormField__Label" htmlFor="clave">Contraseña</label>
                    <input type='password' id="clave" className="FormField__Input" placeholder="Escriba su contraseña" name="password"
                    value={this.state.password} onChange={this.handleChange}></input>
                    
                </div>

                <div className="FormField">
                    <button className="FormField__Button mr-20">Acceder</button>
                    <Link to="/login" className="FormField__Link">Crearse una cuenta</Link>
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

const SignInForm = compose(
    withFirebase,
    connect(mapStateToProps)
  )(SignInFormBase);
export default SignInForm;