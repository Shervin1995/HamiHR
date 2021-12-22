import React, { Component } from 'react';
import '../App.css';
import SideNavigation from './SideNavigation';
import TopNavigation from './TopNavigation';
import Copyrights from './Footer';
import Routes from './Routes';
import services from "../Axios"
import './RoutesWithNavigation.css';

class App extends Component { 
  constructor(props) {
    super(props)

    this.state = {
      profile: {
        allPositions: [],
        currentPositionID: null,
        id: 0
      },
      toggle: false,
      windowWidth: 0,
      currentPage: '',
      sideNavToggled: false,
      breakWidth: 1400
    }

    this.Profile = this.Profile.bind(this)
  } 

  componentDidUpdate(prevProps, nextProps, snapshot) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.assessLocation(this.props.location.pathname);
    }
  }

  componentDidMount() {

    // profile
    this.Profile()

    //
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    this.assessLocation(this.props.location.pathname);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  toggleSideNav = () => {
    if (this.state.windowWidth < this.state.breakWidth) {
      this.setState({
        sideNavToggled: !this.state.sideNavToggled
      });
    }
  };

  assessLocation = location => {

    let locationString;

    switch (location) {
      // Dashboards:
      case '/auth/profile':
        locationString = 'profile';
        break; 
        case '/auth/Meetings/add':
        locationString = 'all meetings';
        break; 
        case '/auth/Meetings/list':
        locationString = 'all meetings';
        break; 
        case '/auth/Meetings/calendar':
        locationString = 'all meetings';
        break; 
        case '/auth/meeting/:id':
        locationString = 'single meeting';
        break; 
      default:
    }

    this.setState({
      currentPage: locationString
    });

  };

  
  Profile() { 

    // token not exists in cookies 
    var token = localStorage.getItem('psyAccessToken');
    
    if (!token || token == 'undefined') {
      this.props.history.push('/');
    }else{ 
      services.profile().then((response) => {
        // expired
        if (response.data === 'token is expired!') {
          localStorage.removeItem('psyAccessToken');
          this.props.history.push('/')
        }
        // token is valid
        this.setState({profile: response.data});   
      }).catch(e => console.log(e)); 
    }  

  }

  render() {

    const {profile} = this.state; 
    var theLevel ='';
    var hasUnseen ; 

    // no-position panel
    if (profile.allPositions.length == 0) {
      theLevel = "noposition"
    } else {
      
      hasUnseen = profile.hasUnseen;

      var thisPosition = profile.allPositions.find(i => i.id == profile.currentPositionID)
      var pc = thisPosition.personalCode

      if (profile.id == 500) { 
        theLevel = "admin" 
      } else {   
          if (pc.length == 2) { theLevel = "one" } 
          if (pc.length == 4) { theLevel = "two" } 
          if (pc.length == 6) { theLevel = "three" }  
      }

  }
 
 

    const dynamicLeftPadding = {
      paddingLeft:
        this.state.windowWidth > this.state.breakWidth ? '240px' : '0'
    };

    return (
      <div className='app'>
        <div className={`white-skin ${theLevel == 'noposition' ? 'd-none' : null}`}>
          <SideNavigation
            hasUnseen={hasUnseen}
            panel={theLevel}
            breakWidth={this.state.breakWidth}
            style={{ transition: 'all .3s' }}
            triggerOpening={this.state.sideNavToggled}
            onLinkClick={() => this.toggleSideNav()}
          />
        </div>
        <div className='flexible-content white-skin'>
          <TopNavigation
            toggle={this.state.windowWidth < this.state.breakWidth}
            onSideNavToggleClick={this.toggleSideNav}
            routeName={this.state.currentPage}
            className='white-skin'
            hasUnseen={hasUnseen}
          />
          <main className="text-right" style={{
             paddingRight: dynamicLeftPadding.paddingLeft, 
             margin: '8rem 6% 6rem' 
             }}>

            <Routes 
            onChange={() => this.assessLocation()} 
            panel={theLevel} 
            profile={profile}
            reProfile={this.Profile}
            />

          </main>
          <Copyrights
            style={{ 
              paddingRight: dynamicLeftPadding.paddingLeft, 
              position: 'fixed',
               width: '100%' 
              }}
            className='d-none d-lg-block'
          />
        </div>
      </div>
    );
  }
}

export default App;
