import React, {Component} from 'react'
import PublicationList from '../Publications/PublicationsList'
import './Board.css'
import {connect} from 'react-redux'
import {withFirebase} from '../../config/fire'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'


class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
          data: []
        }
    }
    
    componentDidMount() {
        this.onListenForPublication();  
        
    }
    onListenForPublication = () => {
        this.props.firebase
          .publication()
          .orderByChild('createdAt')
          .on('value', snapshot => {
            this.props.onSetPublication(snapshot.val());

          });
      };
    
    
    render(){
      
      const {publicaciones, authUser} = this.props
      console.log(publicaciones)
      var filter = []
      if(!authUser){
        filter = publicaciones.filter(function(publication) {
            return publication.privatePublication == false;
        }) 
      }
      else{
        filter = publicaciones 
      }
      
      console.log(filter)
        return(
            <div className="full">
                
           
            <div className="mt-25 container">
                
                <div className="row #ffebee red lighten-5 board">
                    <div className="col s12 m6">
                       <PublicationList publications={filter}/> 
                    </div>
                    
                </div>
            </div>
            </div>
            
        );
    }

}
const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    publicaciones:Object.keys(state.publicationState.publication || {}).reverse().map(
        key => ({
          ...state.publicationState.publication[key],
          uid: key,
        }),
      ),
});
const mapDispatchToProps = dispatch => ({
    onSetPublication: publication =>
      dispatch({ type: 'Publication_added', publication }),
    
  });
export default compose(withFirebase,connect(mapStateToProps,mapDispatchToProps))(Board);