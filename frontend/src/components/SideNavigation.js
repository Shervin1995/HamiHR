import React from 'react';
import {
  MDBSideNavLink,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBIcon
} from 'mdbreact';
import './SideNavigation.css'; 

class SideNavigation extends React.Component {
  constructor(props){
    super(props);

  }

  // render MDBSideNav Link
  rSNL(to, text) {
    return (
      <MDBSideNavLink to={to} onClick={this.props.onLinkClick}>
        {text}
      </MDBSideNavLink>
    );
  }

  render() {
    
    const {panel, hasUnseen, onLinkClick} = this.props;

    return (
      <div className='white-skin'>
        <MDBSideNav
          logo='https://archive.org/download/hamiket/logo.png'
          bg='https://archive.org/download/hamiket/login.png'
          mask='strong'
          fixed
          breakWidth={this.props.breakWidth}
          triggerOpening={this.props.triggerOpening}
          style={{ transition: 'padding-left .3s' }}
        >
          
          <MDBSideNavNav>
            
            {/* --------------------------- */}
            {/* نمودار درختی */}
            {/* --------------------------- */}
            {
              panel !== "three" ?  
              <MDBSideNavCat
              name='پوزیشن ها'
              id='dashboard-cat'
              icon='info-circle'
              >
                {this.rSNL('/auth/orgchart', 'نمودار درختی')}
                {this.rSNL('/auth/position/add', 'افزودن پوزیشن')}
              </MDBSideNavCat> 
              :
              <MDBSideNavLink topLevel onClick={onLinkClick}> </MDBSideNavLink>
            }
            {
              panel !== "three" ?  
              <MDBSideNavCat
                name='کاربر ها'
                id='dashboard-cat'
                icon='info-circle'
                >
                  {this.rSNL('/auth/user/noposition', 'کابران بدون پوزیشن')}
                  {this.rSNL('/auth/user/add', 'افزودن کاربر')}
                </MDBSideNavCat>
                : 
                <MDBSideNavLink topLevel onClick={onLinkClick}> </MDBSideNavLink>
            }
            
            <MDBSideNavCat
              name='گزارش ها'
              id='dashboard-cat'
              icon='info-circle'
            >
              {this.rSNL('/auth/reports', 'گزارش های شما')}
              {this.rSNL('/auth/report/create', 'افزودن گزارش')}
            </MDBSideNavCat> 
 
            <MDBSideNavCat
              name='پیام ها'
              id='dashboard-cat'
              icon='info-circle'
            > 

              <MDBSideNavLink to='/auth/tickets' onClick={this.props.onLinkClick}>
                صندوق پیام
                {
                hasUnseen ? 
                <MDBIcon 
                icon="circle" 
                className="text-danger" 
                style={{left: "128px", right: "auto"}} 
                /> 
                : null
                }
              </MDBSideNavLink>

              {this.rSNL('/auth/ticket/create', 'ارسال پیام')}

            </MDBSideNavCat>

               
            <MDBSideNavCat
              name='اسناد'
              id='dashboard-cat'
              icon='info-circle'
            >
              {this.rSNL('/auth/medias', 'تمام اسناد')}
              {this.rSNL('/auth/media/create', 'افزودن سند')}
            </MDBSideNavCat>
               

          </MDBSideNavNav>
        </MDBSideNav>
      </div>
    );
  }
}

export default SideNavigation;
