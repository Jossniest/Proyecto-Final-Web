import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './NewPublication.css'
import Select from 'react-select';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withFirebase} from '../../config/fire'
import {Redirect} from 'react-router-dom'


class NewPublication extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            selectuser: '' ,
            otheruser: '',
            img: '',
            body: '',
            url: '',
            publicConfession: false,
            privatePublication: false,
            data: []
        };
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
            this.props.onSetUser(snapshot.val());

          });
      };

    componentWillUnmount() {
        this.props.firebase.publication().off();
        this.props.firebase.users().off();
    }

    handleChange(e){
        let reader = new FileReader()
        const { name, value, files} = e.target;
        switch (name){
            case 'img':
                let file = e.target.files[0]
                reader.onloadend = () => {
                    this.setState({
                        img: file,
                        url: reader.result
                    })
                }
                reader.readAsDataURL(file)
                
                console.log("file", this.state.img)
                console.log("url", this.state.url)
                break;
            default:
                break;
        }
        this.setState({[name]: value});
    }

    handleSubmit(e, authUser){
        e.preventDefault();
        const {title, body, selectuser, otheruser,img,publicConfession,privatePublication, url} = this.state
        this.props.firebase.profile(new Date().getTime()).put(img).
        then((snapshot) =>{
            this.props.firebase.publication().push({
                title,
                body,
                selectuser,
                otheruser,
                img: snapshot.metadata.downloadURLs[0],
                publicConfession,
                privatePublication,
                userId: authUser.uid,
                createdAt: this.props.firebase.serverValue.TIMESTAMP,
              });
        })
        
        console.log(this.state)
        
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

    render(){
        const { users,authUser } = this.props;
        let data = []
        users.map((key) =>{
            this.state.data = {label: key.name, value:key.name}
        }) 

        const datos = this.state.data
        console.log(users)
        console.log(datos)

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
                        <Select options={users.name} className="react-select-container" name="selectuser" onChange={(values) => this.setValues(values)}/> 
                    </div>
                    {this.renderElement()}

                    <div className="custom-file mt-25 col s6">
                        <i className="material-icons prefix">archive</i>
                        <input type="file" accept="image/*" name="img" id="img" className="form-control-file mt-25"  onChange={this.handleChange} ></input>
                        
                    </div>
                    { this.state.img ? 
                    <div class="card small col s6 container">
                        
                        <div className="card-content center-align" >
                          <img className="image-size" src={this.state.url ? this.state.url : "https://gbo.eu/wp-content/themes/gbotheme/data/img/empty.jpg"} atl=""/>
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
                        <button className="FormField__Button mr-20" >Enviar Confesión</button> 
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
    onSetUser: users => 
        dispatch({type:'USERS_SET', users})
});
const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    users: Object.keys(state.userState.users || {}).map(key => ({
      ...state.userState.users[key],
      uid: key,
    })),
  });


export default compose(withFirebase, connect(mapStateToProps,mapDispatchToProps))(NewPublication);