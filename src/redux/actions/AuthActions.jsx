import Axios from 'axios'
import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from './type'
import { API_URL } from '../../supports/ApiUrl'

export const getdata=(id)=>{
    Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${id}&status=oncart`)
    .then((res)=>{
        if(res.data.length){
            return res.data[0].transactiondetails.length
        }else{
            return 0
        }
    }).catch((err)=>{
        console.log(err)
    })
}
export const LoginUser=({username,password})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''){//kalo ada input yang kosong
            dispatch({type:USER_LOGIN_FAILED,payload:'username atau password tidak terisi'})
        }else{
            Axios.get(`${API_URL}/users/login`,{
                params:{
                    username:username,
                    password
                }
            }).then((res)=>{
                if(res.data.status){
                    localStorage.setItem('token',res.data.token)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data,jumlahcart:res.data.jumlahcart})
                }else{
                    dispatch({type: USER_LOGIN_FAILED,payload:'username atau password tidak terdaftar'})
                }
            }).catch((err)=>{
                console.log(err)
                dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const RegisUser=({username,password,confpass,email})=>{
    return (dispatch)=>{
        dispatch({type:USER_LOGIN_START})
        if(username===''||password===''||confpass===''||email===''){//kalo ada input yang kosong
            dispatch({type:USER_LOGIN_FAILED,payload:'isi semua yang kosong dulu'})
        }else if(password!==confpass){
            dispatch({type:USER_LOGIN_FAILED,payload:'pass dan confirm tidak sama'})
        }else{
            var data={
                username,
                password,
                email
            }
            Axios.post(`${API_URL}/users/register`,data)
            .then((res)=>{
                if(res.data.status){
                    localStorage.setItem('token',res.data.token)
                    dispatch({type:USER_LOGIN_SUCCESS,payload:res.data,jumlahcart:0})
                }else{
                    dispatch({type: USER_LOGIN_FAILED,payload:'username '+username+ ' sudah ada'})
                }
            }).catch((err)=>{
                    dispatch({type:USER_LOGIN_FAILED,payload:err.message})
            })
        }
    }
}

export const errormessageclear=()=>{
    return{
        type:'ErrorClear'
    }
}
export const KeepLogin=(data,jumlahcart)=>{
    return{
        type:USER_LOGIN_SUCCESS,
        payload:data,
        jumlahcart:jumlahcart
    }
}
export const afterVerified=(data)=>{
    return{
        type:'AFTER_VERIFIED',
        payload:data
    }
}
export const CartChange=(data)=>{
    return{
        type:"ADDCART",
        payload:data
    }
}

