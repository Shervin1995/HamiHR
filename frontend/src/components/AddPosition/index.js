import React, { Component } from "react";  
import services from "../../Axios"
import AddThreeForm from "./three";
import AddTwoForm from "./two";
import AddOneForm from "./one";

// ----------------------------------------
// Meetingsadd
// ----------------------------------------
class AddPosition extends Component { 
  constructor(props){
    super(props);
    this.state = {
      users: [],
      ones: []
    }

    this.getOnes = this.getOnes.bind(this);
  }

  componentDidMount(){
    this.getOnes()
  }

  getOnes(){

    // users
    services.getAllUsers().then(res => {
      this.setState({users: res.data})
    }).catch(e => console.log(e));

    // ones
    services.getOnes().then(res => {
      this.setState({ones: res.data});  
    }).catch(e => console.log(e));
    
  } 

  render() {

    var {users, ones} = this.state;
    const {theLevel} = this.props;
    
    return (
      <React.Fragment> 
        <h4 className="irs mb-3 font-weight-bold">
          افزودن پوزیشن
        </h4>
        <hr/>
        <div className="row">  
        {
          theLevel == "one" || theLevel == "admin" || theLevel == "two" ?
          <AddThreeForm users={users} ones={ones} panel={theLevel}   /> : null
        }
        {
          theLevel == "one" || theLevel == "admin" ? 
          <AddTwoForm users={users} ones={ones} panel={theLevel}  /> : null
        }
        {
          theLevel == "admin" ? 
          <AddOneForm users={users} /> : null
        } 
        </div>
      </React.Fragment>
    );
  }

}

//
export default AddPosition;
