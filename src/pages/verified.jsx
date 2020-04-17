import React, { Component } from 'react';
import Axios from 'axios'
import { API_URL } from '../supports/ApiUrl';
import querystring from 'query-string'
import {connect} from 'react-redux'
import {afterVerified} from './../redux/actions'
class Verified extends Component {
    state = {
        success:0
    }

    componentDidMount(){
        console.log(this.props.location.search)
        var obj=querystring.parse(this.props.location.search)
        console.log(obj)
        Axios.get(`${API_URL}/users/verified`,{
            headers:{
                'Authorization':`Bearer ${obj.token}`
            }
        }).then((res)=>{
            console.log(res.data)
            this.props.afterVerified(res.data)
            this.setState({success:1})
        }).catch((err)=>{
            console.log(err)
            this.setState({success:2})
        })
        // Axios.put(`${APIURL}/users/verified`,obj)
        // .then((res)=>{
        //     console.log(res.data)
        //     this.props.Userregister2(res.data)
        //     this.setState({success:1})
        // }).catch((err)=>{
        //     console.log(err)
        //     this.setState({success:2})
        // })
    }

    render() {
        // console.log(this.props.Auth)
        if(this.state.success===1){
            return(
            <div className='paddingatas' >
                <center>
                    <h1>
                       Berhasil verified
                    </h1>
                </center>
            </div>
            )
        }else if(this.state.success===2){
            return(
            <div className='paddingatas'>
                <center>
                    <h1>
                       gagal verified
                    </h1>
                </center>
            </div>
            )
        }
        return (
            <div className='paddingatas'> 
                <center>
                    <h1>
                        sedang menunggu verified
                    </h1>
                </center>
            </div>
          );
    }
}


const bebas=(state)=>{
    return{
        Auth:state.Auth
    }
}

export default connect(bebas,{afterVerified}) (Verified);