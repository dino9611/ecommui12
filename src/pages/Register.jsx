import React,{useState} from "react";
import {  MDBInput, MDBBtn,MDBAlert } from 'mdbreact';
import {connect} from 'react-redux'
import {RegisUser,errormessageclear} from './../redux/actions'
import {Redirect} from 'react-router-dom' 
const Register = (props) => {

    const [data,setdata]=useState({
        username:'',
        password:'',
        confpass:'',
        email:''
    })
    const dataOnChange=(e)=>{
        setdata({...data,[e.target.name]:e.target.value})
    }
    const onFormSubmit=(e)=>{
        e.preventDefault()
        props.RegisUser(data)
    }
    if(props.islogin){
        return <Redirect to='/'/>
    }
    return (
        <div>
            <div className='d-flex justify-content-center align-items-center' style={{height:'90vh'}}>
                <form style={{width:'30%'}} onSubmit={onFormSubmit}>
                    <p className="h3 text-center mb-4">Register</p>
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
                        <MDBInput 
                            label="Type your email" 
                            name='email' 
                            onChange={dataOnChange} 
                            icon="envelope" 
                            group 
                            type="text" 
                            validate 
                            error='dsadas'
                            value={data.email}
                        />
                        <MDBInput value={data.password} label="Type your password" name='password' onChange={dataOnChange} icon="lock" group type="password" validate />
                        <MDBInput value={data.confpass} label="Confirm Password" name='confpass' onChange={dataOnChange} icon="key" group type="password" validate />
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
                </form>
            </div>
        </div>
    );
};

const MapstatetoProps=(state)=>{
    return state.Auth
}

export default connect(MapstatetoProps,{errormessageclear,RegisUser}) (Register);