import {
    USER_LOGIN_FAILED,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS
} from './../actions/type'


const INITIAL_STATE={
    username:'',
    id:0,
    loading:false,
    islogin:false,
    errormes:'',
    cart:0,
    role:'',
    token:'',
    password:'',
    isverified:0
}


export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case USER_LOGIN_START:
            return {...state,loading:true}
        case USER_LOGIN_SUCCESS:
            return {...state,loading:false,...action.payload,islogin:true,cart:action.jumlahcart}
        case USER_LOGIN_FAILED:
            return{...state,loading:false,errormes:action.payload}
        case 'ADDCART':
            return{...state,cart:action.payload}
        case 'AFTER_VERIFIED':
            return {...state,...action.payload}
        case 'ErrorClear':
            return INITIAL_STATE
        default:
            return state
    }
}



