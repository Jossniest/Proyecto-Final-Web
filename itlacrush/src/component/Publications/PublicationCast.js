import React, {Component} from 'react';
import persona from '../../resources/persona.jpg'
import 'bootstrap/dist/css/bootstrap.css';

class PublicationCast extends Component{
    constructor(props){
      super()
      this.state = {
        isCardView: false
      }
      
    }
    render(){
      console.log(this.props.publication)
        return(
            <div className="card z-depth-2 #fafafa grey lighten-5 mt-25 large sticky-action" style={{marginLeft:"100px",marginRight:"100px"}}>
                
                <div className="d-flex">
                <i className="btn-floating btn-small waves-effect waves-light red">{this.props.publication.iniciales}</i>
                <h3 className='font-weight-bolder text-dark valign-wrapper ml-25'>{this.props.publication.username}</h3>  
                </div>

                <div className="card-image waves-effect waves-block waves-light">
                  <img className="activator" src={persona} alt="Foto Crush"/>
                </div>
                <div className="card-content">
                  <span className="card-title activator grey-text text-darken-4">{this.props.publication.title}<i className="material-icons right">more_vert</i></span>
                  
                </div>
 
                <div className="card-reveal">
                  <span className="card-title grey-text text-darken-4">{this.props.publication.title}<i className="material-icons right">close</i></span>
                  <p>{this.props.publication.body}</p>
                </div>
                <div className="card-action">
                <div className="d-flex">
                  <div className="p-2 w-100">
                    <span className="text-secondary font-italic">Para: </span>
                    <span className="text-dark font-weight-bold">{this.props.publication.destined}</span>
                  </div>
                  <div className="p-2 flex-shrink-1">
                    <a className="like-button" onClick={()=>this.setState({ isCardView: !this.state.isCardView })}>
                    { this.state.isCardView
                      ? <i className="material-icons" >favorite</i>
                      : <i className="material-icons">favorite_border</i>
                    }
                    
                  </a></div>
                </div>
                <div className="d-flex">
                  <div className="p-2 w-100"></div>
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
export default PublicationCast