import React, {Component} from 'react';
import PublicationCast from './PublicationCast'

class PublicationList extends Component{
    constructor(props){
        super();
        
    }
    render(){
        console.log(this.props.publications)
        return(
           <div className="section">
               {this.props.publications && this.props.publications.map(publication => {
                   return (
                       <PublicationCast publication={publication}></PublicationCast>
                   )
               })}
           </div> 
        )
    }
}
export default PublicationList