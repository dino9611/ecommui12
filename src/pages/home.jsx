import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
class Home extends Component {
    state = {  }


    render() {
        if(this.props.islogin){
            return (
                <div>
                    <h1> INI Home  </h1>
                </div>
              );
        }
        return(
            <Redirect to='/login'/>
        )
    }
}

const MapstatetoProps=({Auth})=>{
    return{
        islogin:Auth.islogin
    }
}

export default connect(MapstatetoProps) (Home);