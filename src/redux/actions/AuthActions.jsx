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
            Axios.get(`${API_URL}/users`,{
                params:{
                    username:username,
                    password:password
                }
            })
            .then((res)=>{
                if(res.data.length){//user ada
                    Axios.get(`${API_URL}/transactions?_embed=transactiondetails&userId=${res.data[0].id}&status=oncart`)
                    .then((res1)=>{
                        localStorage.setItem('iduser',res.data[0].id)
                        if(res1.data.length){
                            dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0],jumlahcart:res1.data[0].transactiondetails.length})                            
                        }else{
                            
                            dispatch({type:USER_LOGIN_SUCCESS,payload:res.data[0],jumlahcart:0})
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
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
export const CartChange=(data)=>{
    return{
        type:"ADDCART",
        payload:data
    }
}

