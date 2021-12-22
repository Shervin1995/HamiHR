import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge
} from 'mdbreact';

import './TopNavigation.css'

class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logout: false,
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleToggleClickA = this.handleToggleClickA.bind(this);
    this.logout = this.logout.bind(this)
  }


  logout(){
    localStorage.removeItem('psyAccessToken'); 
    this.setState((prevstate) => ({
      ...prevstate,
      logout: true
    }))
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  handleToggleClickA() {
    this.props.onSideNavToggleClick();
  }

  render() {
    
    if (this.state.logout) {
      return <Redirect to="/" />
    }
    const navStyle = {
      paddingLeft: this.props.toggle ? '16px' : '240px',
      transition: 'padding-left .3s'
    };
    return (
      <Router>
        <MDBNavbar
          className='flexible-MDBNavbars'
          light
          expand='md'
          scrolling
          fixed='top'
          style={{ zIndex: 3 }}
        >
         
{/*
          <MDBNavbarBrand href='/' style={navStyle}>
            <strong>{this.props.routeName}</strong>
          </MDBNavbarBrand>
*/}
          <MDBNavbarNav expand='sm' style={{ flexDirection: 'row' }}> 
            
            {/*  */}
            <MDBDropdown>
              <MDBDropdownToggle nav caret>
                <span className='d-none d-md-inline irs'>پروفایل</span>
                {' '}<MDBIcon icon='user' />
              </MDBDropdownToggle>
              <MDBDropdownMenu right style={{ minWidth: '100px' }}>
                <MDBDropdownItem className="text-right irs" href='/auth/profile'>
                اطلاعات پروفایل 
                </MDBDropdownItem>
                <MDBDropdownItem className="text-right irs" onClick={this.logout}>
                  خروج
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown> 

            {/*  */}
            {
              this.props.hasUnseen ? 
              <MDBNavItem >
                <MDBNavLink to='/auth/i' className="red-text irs" >
                  <MDBIcon icon='comment' className="ml-2" />
                  <span className='d-none d-md-inline ml-1'>
                    پیام جدید!
                  </span>
                </MDBNavLink>
              </MDBNavItem> : null
            }

          </MDBNavbarNav>

          <div
            onClick={this.handleToggleClickA}
            key='sideNavToggleA'
            style={{
              lineHeight: '32px',
              marginleft: '1em',
              verticalAlign: 'middle',
              cursor: 'pointer'
            }}
          >
            <MDBIcon icon='bars' color='white' size='lg' />
          </div>

        </MDBNavbar>
      </Router>
    );
  }
}

export default TopNavigation;
