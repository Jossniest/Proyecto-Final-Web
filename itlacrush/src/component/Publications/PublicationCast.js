import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withFirebase} from '../../config/fire'


class PublicationCast extends Component{
    constructor(props){
      super()
      this.state = {
        isCardView: false,
        usernames: []
      }
      
    }

    render(){
      
      let isSelectUser = false;
      if(this.props.publication.selectuser !== "Otro"){
        isSelectUser = !isSelectUser
      }
      
        return(
            <div className="card z-depth-2 #fafafa grey lighten-5 mt-25 large sticky-action" style={{marginLeft:"100px",marginRight:"100px"}}>
                
                <div style={{marginTop:"20"}}>
                
                <h3 className='font-weight-bolder text-dark text-center'>{this.props.publication.publicConfession ? this.props.publication.user : "Anonimo"}</h3>  
                </div>

                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator img-fluid mt-1 image-size" src={this.props.publication.img} alt="Foto Crush"/>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{this.props.publication.title}<i className="material-icons right">more_vert</i></span>
                  
                </div>
 
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{this.props.publication.title}<i className="material-icons right">close</i></span>
                  <p>{this.props.publication.body}</p>
                </div>
                <div className="card-action mt-1">
                <div className="d-flex">
                  <div className="p-2 w-100">
                    <span className="text-secondary font-italic">Para: </span>
                    <span className="text-dark font-weight-bold">{isSelectUser ? this.props.publication.selectuser : this.props.publication.otheruser }</span>
                  </div>
                  <div className="p-2 flex-shrink-1">
                    <i className="like-button" onClick={()=>this.setState({ isCardView: !this.state.isCardView })}>
                    { this.state.isCardView
                      ? <i className="material-icons" >favorite</i>
                      : <i className="material-icons">favorite_border</i>
                    }
                    
                  </i></div>
                </div>
                <div className="d-flex">
                  <div className="p-2 w-100">
                    <span className="text-secondary font-italic">{this.props.publication.privatePublication ? "Declaración Privada": " Declaración Publica"}</span>
                  </div>
                  <div className="p-2 flex-shrink-0">
                    <span className="text-secondary font-italic">Publicado en</span><br/>
                    <span className="text-dark font-weight-italic">{this.props.publication.date}</span>
                    </div>
                </div>
                </div>
            </div>
            
            
        )
    }
}
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  users: Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key,
  })),
});


export default compose(withFirebase, connect(mapStateToProps))(PublicationCast);