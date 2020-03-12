import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'
import {BukanHome,IniHome} from './../redux/actions'
class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
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
                            this.props.User.role==='admin'?
                            <MDBNavLink to='/manageadmin'>
                                manage Admin
                            </MDBNavLink>
                            :
                            null
                        }
                            
                    </MDBNavItem>
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
                        {/* <MDBNavLink>
                            dasdas
                        </MDBNavLink> */}
                    </MDBNavItem>
                    <MDBNavItem>
                        {
                            this.props.User.username?
                            <MDBDropdown >
                                <MDBDropdownToggle nav className='warnanav' >
                                    <FaUserCircle/> hallo, {this.props.User.username}
                                </MDBDropdownToggle>
                                <MDBDropdownMenu className='dropdown1' >
                                    <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                                    <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
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
        Header:state.Header.ishome
    }
}
 
export default connect(MapstatetoProps,{IniHome,BukanHome})(NavbarPage);