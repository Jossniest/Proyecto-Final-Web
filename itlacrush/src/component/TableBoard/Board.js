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
        
        return(
            <div className="full">
                
           
            <div className="mt-25 container">
                
                <div className="row #ffebee red lighten-5 board">
                    <div className="col s12 m6">
                       <PublicationList publications={publicaciones}/> 
                    </div>
                    
                </div>
            </div>
            </div>
            
        );
    }

}
const mapStateToProps = (state) => ({
    authUser: state.sessionState.authUser,
    publicaciones:Object.keys(state.publicationState.publication || {}).map(
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