import React from 'react'
import { DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavLink, UncontrolledDropdown } from 'reactstrap';
import { Link} from 'react-router-dom';

import logo from '../commons/images/icon.png';

const textStyle = {
    color: 'white',
    textDecoration: 'none'
};



function AdminNavBar() {

    const pathname = window.location.pathname; 
    const isAdminPage = pathname !== '/' && pathname.startsWith('/admin');

    return (
        <div>
          {isAdminPage && ( 
            <Navbar color="dark" light expand="md">
                <NavbarBrand href="/">
                    <img src={logo} width={"50"}
                        height={"35"} />
                </NavbarBrand>
                <Nav className="mr-auto" navbar>
               
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle style={textStyle} nav caret>
                            Menu
                        </DropdownToggle>
                        <DropdownMenu right >

                            <DropdownItem>
                                <NavLink href="/admin/client">Clients</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/admin/device">Devices</NavLink>
                            </DropdownItem>
                            <DropdownItem>
                                <NavLink href="/admin/edits">Administrators</NavLink>
                            </DropdownItem>


                        </DropdownMenu>
                    </UncontrolledDropdown>
            
                </Nav>
            </Navbar>
         )}
        </div>
    );
}

export default AdminNavBar;
