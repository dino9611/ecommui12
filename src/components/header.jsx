import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import {connect} from 'react-redux'
import {FaUserCircle} from 'react-icons/fa'

class NavbarPage extends Component {
    state = {
        isOpen: false
    };

    toggleCollapse = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <MDBNavbar color="blue" dark expand="md">
                <MDBNavbarBrand href='/'>
                    <strong className="white-text">MiniMales</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick={this.toggleCollapse} />
                <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                <MDBNavbarNav right className='mr-5' >
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
                        {/* <MDBNavLink>
                            adsadsa
                        </MDBNavLink> */}
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
                                <MDBDropdownToggle nav  caret>
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
        User:state.Auth
    }
}
 
export default connect(MapstatetoProps)(NavbarPage);