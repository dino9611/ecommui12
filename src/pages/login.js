import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {LoginUser,errormessageclear,KeepLogin} from './../redux/actions'
import {Redirect} from 'react-router-dom' 
import Facebooklogin from 'react-facebook-login'
import Axios from "axios";
import { API_URL } from "../supports/ApiUrl";


const Login = (props) => {

    const [data,setdata]=useState({
        username:'',
        password:''
    })
    const dataOnChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.LoginUser(data)
    }

    const componentClicked=()=>{
        console.log('click')
    }
    const responseFacebook=(response)=>{
        console.log(response)
        var data={
            username:response.name,
            email:response.email
        }
        // console.log(data)
        Axios.post(`${API_URL}/users/fblog`,data)
        .then((res)=>{
            localStorage.setItem('token',res.data.token)
            props.KeepLogin(res.data,res.data.jumlahcart)
        }).catch((Err)=>{
            console.log(Err)
        })
    }
    if(props.islogin){
        return <Redirect to='/'/>
    }
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mb-4">Sign in</p>
                    <div className="grey-text">
                        <MDBInput 
                            label="Type your Username" 
                            name='username' 
                            onChange={dataOnChange} 
                            icon="user" 
                            group 
                            type="text" 
                            validate 
                            error='dsadas'
                            value={data.username}
                        />
                        <MDBInput value={data.password} label="Type your password" name='password' onChange={dataOnChange} icon="lock" group type="password" validate />
                    </div>
                    {
                        props.errormes?
                        <MDBAlert color="danger" >
                            {props.errormes} <span className='float-right hovererr font-weight-bold' onClick={()=>props.errormessageclear()}>X</span>
                        </MDBAlert>
                        :
                        null
                    }
                    <div className="text-center">
                        <MDBBtn type='submit' disabled={props.loading}>Login</MDBBtn>
                    </div>
                    <Facebooklogin
                        appId="813591125726432"
                        // autoLoad={true}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                    />
                </form>
            </div>
        </div>
    );
};

const MapstatetoProps=(state)=>{
    return state.Auth
}

export default connect(MapstatetoProps,{LoginUser,errormessageclear,KeepLogin}) (Login);