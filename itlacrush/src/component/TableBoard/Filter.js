import React, {Component} from 'react';
import Select from 'react-select';

const data = [
    { label: "Publicos", value: 1 },
    { label: "Privados", value: 2 },
    
  ];

 
class Filter extends Component{
    constructor(){
        super();
        this.state = {
            option: "publico"
        }
        
    }


    render(){
        return(
                           
                
            <Select options={ data } defaultValue={{ label: "Publicos", value: 1 }} className="react-select-container" onChange={this.handleChange}/>                    
           
        )
    }
}
export default Filter;