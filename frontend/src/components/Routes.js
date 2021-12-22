import React from 'react';
import { Route, Switch } from 'react-router-dom';

// 
import DashProfile from './Profile';
import OrgChart from './OrgChart';
import UnitPositions from './UnitPositions';

//
import AddPosition from './AddPosition';
import AddUser from './User/add';
import NoPosition from './User/NoPosition';

//
import AddReport from './Report/Add';
import ReportList from './Report/List';
import SingleReport from './Report/Single';

// ticket
import AddTicket from "./Ticket/Add"
import Sandogh from './Ticket/sandogh';
import SingleTicket from './Ticket/singleTicket';


// media
import AddMedia from "./Media/Add"
import MediaList from './Media/List';
import SingleMedia from './Media/Single';

// page 404
const fourtOFour = () => {
  return (<h1 className="text-center">404</h1>)
}


// ----------------------------------
// 
// ----------------------------------
class Routes extends React.Component {
  constructor(props){
    super(props); 
    this.reProfile = this.reProfile.bind(this)
  } 

  reProfile(){
    this.props.reProfile()
  }

  render() {
    const {panel, profile} = this.props;

    return (
      <Switch>

        {/*  */}
        <Route path="/auth/profile" render={() => <DashProfile profile={profile} />} />
        <Route path="/auth/orgchart" component={OrgChart} /> 
        <Route path="/auth/unit-positions/:personalCode" component={UnitPositions} />  

        {/*  */}
        <Route path="/auth/position/add" render={() => <AddPosition theLevel={panel} />} />
        <Route path="/auth/user/add" component={AddUser} />  
        <Route path="/auth/user/noposition" component={NoPosition} />  

        {/*  */}
        <Route path="/auth/report/create" component={AddReport} />  
        <Route exact path="/auth/reports" component={ReportList} />  
        <Route path="/auth/reports/:reportID" component={SingleReport} />  

        {/* TICKET */}
        <Route path="/auth/ticket/create" component={AddTicket} />  
        <Route exact path="/auth/tickets" component={Sandogh} />  
        <Route path="/auth/tickets/:ticketID" render={({match}) => <SingleTicket match={match} reProfile={this.reProfile} />} />  

        {/* MEDIA */}
        <Route path="/auth/media/create" component={AddMedia} />  
        <Route exact path="/auth/medias" component={MediaList} />  
        <Route path="/auth/medias/:mediaID" component={SingleMedia} />  

        {/*  */}
        <Route component={fourtOFour} />
        
      </Switch>
    );
  }
} 

// 
export default Routes;