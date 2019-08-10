import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NewPublication.css'
import Select from 'react-select';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withFirebase} from '../../config/fire'
import {Redirect} from 'react-router-dom'

function validate(title,selectuser, img,body,url ) {
    // true means invalid, so our conditions got reversed
    return {
        title: title.length === 0,
        selectuser: selectuser.length === 0 ,
        img: null,
        body: body.length === 0,
        url: null,
        
    };
  }

const InitState = {
    title: '',
    selectuser: '' ,
    otheruser: '',
    img: null,
    body: '',
    url: null,
    
}
class NewPublication extends Component{
    constructor(props){
        super(props);
        this.state = {
            ...InitState,
            publicConfession: false,
            privatePublication: false,
            logUser: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleChangePublica = this.toggleChangePublica.bind(this);
        this.setValues = this.setValues.bind(this);
        this.toggleChangePrivada = this.toggleChangePrivada.bind(this);
        
    }
    componentDidMount() {
        this.onListenForUsers();
        
    }
    onListenForUsers = () => {
        this.props.firebase
          .users()
          .on('value', snapshot => {
            this.props.onSetUsers(snapshot.val());

        });
    };
   
     
    componentWillUnmount() {
        this.props.firebase.publication().off();
        this.props.firebase.users().off();
        this.props.firebase.user(this.props.match.params.id).off();
    }

    handleChange(e){
        let reader = new FileReader()
        const { name, value, files} = e.target;
        switch (name){
            case 'img':
                try{
                let file = e.target.files[0]
                
                reader.onloadend = () => {
                    
                    this.setState({
                        img: file,
                        url: reader.result
                    })
                }
                reader.readAsDataURL(file)
    
                }
                catch(error){
                    console.log(error)
                    this.setState({
                        img: null,
                        url: null
                    })
                }
                break;
            default:
                break;
        }
        this.setState({[name]: value});
        
    }

    handleSubmit(e, authUser){
        if (!this.canBeSubmitted()) {
            e.preventDefault();
            return;
          }
        e.preventDefault()
        const {title, body, selectuser, otheruser,img,publicConfession,privatePublication} = this.state
        console.log(authUser.name + ' ' + authUser.lastname)
        this.props.firebase.profile(`profile/${new Date().getTime()}`).put(img).
        then((snapshot) =>{
            snapshot.ref.getDownloadURL().then((url) =>{
                this.props.firebase.publication().push({
                    title,
                    body,
                    selectuser,
                    otheruser,
                    img: url,
                    publicConfession,
                    privatePublication,
                    user: authUser.name + ' ' + authUser.lastname,
                    date: new Date().toLocaleDateString(),
                    createdAt: this.props.firebase.serverValue.TIMESTAMP,
            })
            
              });
        }).then(() =>{
            console.log(this.state)  
            this.setState(InitState)

        })
         
    } 
    toggleChangePrivada = () => {
        this.setState({
            privatePublication: !this.state.privatePublication,
        });
      } 

    toggleChangePublica = () => {
        this.setState({
            publicConfession: !this.state.publicConfession,
        });
      } 
    setValues(e){
        this.setState({
            selectuser: e.label
        })
        console.log(this.state.selectuser)
    }
    
    renderElement(){
        if(this.state.selectuser === "Otro"){
                return(
                    <div className="input-field mt-25">
                    <input id="otherUser" type="text"  name="otheruser" placeholder="Especifique el nombre del usuario" onChange={this.handleChange} className="validate"/>
                    </div>
                )          
        }
    }
    canBeSubmitted() {
        const errors = validate(this.state.title, this.state.selectuser, this.state.img, this.state.body,this.state.url);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        return !isDisabled;
      }

    render(){
        const errors = validate(this.state.title, this.state.selectuser, this.state.img, this.state.body,this.state.url);
        const isDisabled = Object.keys(errors).some(x => errors[x]);
        
        const {users, authUser} = this.props;
        
        let options = users.map(function (user) {
            return { value: user.user, label: user.name + ' ' + user.lastname };
          })
        let otros = { value: "Otro" , label: "Otro" }
        options.push(otros)
        
        
        if(!authUser) return <Redirect to="/"></Redirect>

        let msgcheck = null,
        msgcheck2 = null
        if(this.state.publicConfession){
            msgcheck = "Tu Nombre sera publicado";
        }
        if(this.state.privatePublication){
            msgcheck2 = "Tu publicacion solo sera vista por usuarios activos";
        }
        return(
            <div className="container dark-gray-3 mt-25">
            <div className="card">
            <span className="card-title center-align font-weight-bold mt-25 red-text">Nueva Publicacion</span>
            <div className="FormCenter pub-form">
                <form className="FormFields" onSubmit={e => this.handleSubmit(e, this.props.authUser)}>
                    <div className="row">
                    <div className="switch col s6">
                        <label className="active font-weight-bold">Tipo de confesión</label><br/>  
                        <label >
                          Anonima
                          <input type="checkbox" defaultChecked={this.state.publicConfession} onChange={this.toggleChangePublica}/>
                          <span className="lever"></span>
                          Publica
                        </label>
                        <p className="text-danger font-weight-light">{msgcheck ? msgcheck: ''}</p>              
                    </div>
                    <div className="switch col s6">
                        <label className="active font-weight-bold">Tipo de publicacion</label><br/>  
                        <label >
                          Publica
                          <input type="checkbox" defaultChecked={this.state.privatePublication} onChange={this.toggleChangePrivada}/>
                          <span className="lever"></span>
                          Privada
                        </label>
                        <p className="text-danger font-weight-light">{msgcheck2 ? msgcheck2: ''}</p>              
                    </div>
                    </div>    
                    <div className="switch mt-25 col s6">
                        <label className="active font-weight-bold">Destinatario de la confesión</label><br/>  
                        <Select options={options} className="react-select-container" name="selectuser" onChange={(values) => this.setValues(values)}/> 
                    </div>
                    {this.renderElement()}

                    <div className="custom-file mt-25 col s6">
                        <i className="material-icons prefix">archive</i>
                        <input type="file" accept="image/*" name="img" id="img" className="form-control-file mt-25" defaultValue={this.state.img} onChange={this.handleChange} ></input>
                        
                    </div>
                    { this.state.img ? 
                    <div className="card small col s6 container">
                        
                        <div className="card-content center-align" >
                          <img className="image-size" src={this.state.url } atl=""/>
                        </div>
                    </div> : ""
                    }

                    <div className="input-field mt-25">
                        <i className="material-icons prefix">mode_edit</i>
                        <input type='text' placeholder="Escriba su confesión" name="title" id="title" className="materialize-textarea mt-25" value={this.state.title} onChange={this.handleChange}></input>
                        <label htmlFor="title" className="active">Titulo de tu confesión</label>   
                    </div>
                    <div className="input-field mt-25">
                        <i className="material-icons prefix">mode_edit</i>
                        <textarea placeholder="Escriba su confesión" name="body" id="body" className="materialize-textarea mt-25" value={this.state.body} onChange={this.handleChange}></textarea>
                        <label htmlFor="body" className="active">¿Qué confiesas?</label>   
                    </div>
                    <div className="FormField">
                        <button disabled={isDisabled}  className="FormField__Button mr-20" >Enviar Confesión</button> 
                    </div> 
                </form>
            </div>
            </div>
            </div>
        );
    }
}
  
const mapDispatchToProps = dispatch => ({
    onSetPublication: publication =>
      dispatch({ type: 'PUBLICATION_SET', publication }),   
    onSetUsers: users => 
        dispatch({type:'USERS_SET', users}),
    
});
const mapStateToProps = (state, props) => ({
    authUser: state.sessionState.authUser,
    users: Object.keys(state.userState.users || {}).map(key => ({
      ...state.userState.users[key],
      uid: key,
    })),
    
  });


export default compose(withFirebase, connect(mapStateToProps,mapDispatchToProps))(NewPublication);