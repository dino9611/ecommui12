import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import {BukanHome,IniHome,errormessageclear} from './../redux/actions'
import {Link} from 'react-router-dom'
class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }
    onLogoutClick=()=>{
        localStorage.removeItem('iduser')
        this.props.errormessageclear()
    }
 

    render() {
        console.log(this.props.Header)
        return (
            <MDBNavbar color="black" transparent={this.props.Header} scrolling className='bordernav' dark fixed='top' expand="md">
                <MDBNavbarBrand href='/'>
                    <strong className={'white-text'}>MiniMales</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav tag='div' right className='mr-5' >
                    <MDBNavItem >
                        {
                            this.props.User.role===2?
                            <MDBNavLink to='/manageadmin'>
                                manage Admin
                            </MDBNavLink>
                            :
                            null
                        }
                            
                    </MDBNavItem>
                    {
                        this.props.User.islogin &&this.props.User.role===1 ?
                        <MDBNavItem>
                            <MDBNavLink to='/cart'>
                                {this.props.User.cart} <FiShoppingCart style={{fontSize:20}}/> Cart 
                            </MDBNavLink>
                        </MDBNavItem>
                        :
                        null
                    }
                       {
                        this.props.User.islogin &&this.props.User.role===1?
                        <MDBNavItem>
                            <MDBNavLink to='/history'>
                                history
                            </MDBNavLink>
                        </MDBNavItem>
                        :
                        null
                    }
                    <MDBNavItem>
                        {
                            this.props.User.islogin?
                            null
                            :
                            <MDBNavLink to='/login'>
                                Login
                            </MDBNavLink>

                        }
                    </MDBNavItem>
                    <MDBNavItem>
                        {
                            this.props.User.islogin?
                            null
                            :
                            <MDBNavLink to='/register'>
                                Register
                            </MDBNavLink>
                        }
                    </MDBNavItem>
                    <MDBNavItem>
                    {
                            this.props.User.role===2?
                            <MDBNavLink to='/managetransaksi'>
                                manage Transaksi
                            </MDBNavLink>
                            :
                            null
                        }
                    </MDBNavItem>
                    <MDBNavItem>
                        {
                            this.props.User.username?
                            <MDBDropdown >
                                <MDBDropdownToggle nav className='warnanav' >
                                    <FaUserCircle/> hallo, {this.props.User.username}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown1' >
                                {
                                    this.props.User.islogin?
                                    <MDBDropdownItem onClick={this.onLogoutClick}>
                                        <Link to='/'>
                                            Logout
                                        </Link>
                                    </MDBDropdownItem>
                                    :
                                    null
                                }
                                  <MDBDropdownItem>
                                        {
                                            this.props.User.isverified===0?
                                            <Link to='/sendverified'>
                                                <span style={{color:'red'}}>Unverified</span> 
                                            </Link>
                                            :
                                            <span style={{color:'green'}}>verified</span>
                                           
                                        }
                                    </MDBDropdownItem>
                                    <MDBDropdownItem href="#!"></MDBDropdownItem>
                                    {/* <MDBDropdownItem href="#!">Something else here</MDBDropdownItem> */}
                                </MDBDropdownMenu>
                            </MDBDropdown>
                            :
                            null
                        }
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            );
    }
}

const MapstatetoProps=(state)=>{
    return{
        User:state.Auth,
        Header:state.Header.ishome,
    }
}
 
export default connect(MapstatetoProps,{IniHome,BukanHome,errormessageclear})(NavbarPage);