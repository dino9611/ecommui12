import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";


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
                <MDBNavbarNav right className='mr-4' >
                    <MDBNavItem >
                        <MDBNavLink to='/manageadmin'>
                            manage Admin
                        </MDBNavLink>
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
                    <MDBDropdown>
                        <MDBDropdownToggle nav caret>
                            <span >Dropdown</span>
                        </MDBDropdownToggle>
                        <MDBDropdownMenu >
                            <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                            <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                        </MDBDropdownMenu>
                    </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
            );
    }
}

export default NavbarPage;