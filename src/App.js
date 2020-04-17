import React, { useEffect, useState } from 'react';

import './App.css';
import Login from './pages/login'
import Header from './components/header'
import Home from './pages/home'
import {Switch,Route} from 'react-router-dom'
import Axios from 'axios';
import { API_URL } from './supports/ApiUrl';
import { KeepLogin } from './redux/actions';
import {connect} from 'react-redux'
import ManageAdmin from './pages/manageadmin'
import Norfound from './pages/notfound';
import Productdetail from './pages/productdetail'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Allproducts from './pages/Allproduct'
import ManageTransaksi from './pages/manageTransaksi';
import History from './pages/history';
import Verified from './pages/verified'
import SendVerified from './pages/sendverified'

function App({KeepLogin}) {

  const [Loading,setLoading]=useState(true)

  useEffect(()=>{
    var token=localStorage.getItem('token')
    if(token){
      Axios.get(`${API_URL}/users/keeplogin`,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      .then(res=>{
        console.log(res.data)
        KeepLogin(res.data,res.data.jumlahcart)
      }).catch((err)=>{
        console.log(err)
      })
      .finally(()=>{
        setLoading(false)
      })
    }else{
      setLoading(false)
    }
  },[KeepLogin])

  if(Loading){
    return <div>loading....</div>
  }
  return (
    <div>
      <Header/>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/manageadmin' exact component={ManageAdmin}/>
        <Route path='/managetransaksi' exact component={ManageTransaksi}/>
        <Route path='/allproducts' exact component={Allproducts}/>
        <Route path='/productdetail/:idprod' exact component={Productdetail}/>
        <Route path='/cart' exact component={Cart}/>
        <Route path='/history' exact component={History}/>
        <Route path='/verified' exact component={Verified}/>
        <Route path='/sendverified' exact component={SendVerified}/>
        <Route path='/*' component={Norfound}/>
      </Switch>
    </div>
  );
}

// const MapstateToProps=({Auth})=>{
//   return{
//     loading:Auth.
//   }
// }

export default connect(null,{KeepLogin})(App);
