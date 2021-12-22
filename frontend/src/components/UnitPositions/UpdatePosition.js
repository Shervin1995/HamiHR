 
import { MDBIcon } from "mdbreact";
import React, { Component } from "react"; 
import services from "../../Axios"

// --------------------------------------------------------
// SpecialPsychologist
// --------------------------------------------------------
class ReplacePosition extends Component {

    constructor(props) {
      super(props);   

      this.state =  {
        users: []
      }

      this.updatePosition = this.updatePosition.bind(this);
 
    }  
 
    componentDidMount(){ 
      // get all users
      services.getAllUsers().then(res => {
        this.setState({users: res.data})
      }).catch(e => console.log(e)); 
    }

    updatePosition(e){
      e.preventDefault();
      var form = e.target;
      
      var userID = form[0].value;
      var userPositionID = this.props.positionID;

      services.updatePosition({userPositionID, userID}).then(res => {
        this.setState({updated: res.data});

        // refresh page
        setTimeout(() => {
          window.location.reload()
        }, 1000)

      }).catch(e => console.log(e));
 
    }

    render() {
 
      const {users} = this.state;
      
      return (  
          <form onSubmit={this.updatePosition} className=" font-small irs">
              
            {/* 1. userID */}
            <div className="my-3">  
              انتخاب جایگزین: 
              <select name="userID" defaultValue="sd" className="irs mr-2">
                  <option value="sd" disabled key="1" className="irs">
                    انتخاب کنید
                  </option> 
                  {
                    users.map((user, i) => 
                    <option value={user.id} key={i+2} className="irs">
                      {user.firstname} {user.lastname}
                    </option>)
                  }
              </select>
            </div>  

            <div className="my-3">  
                <input type="submit" value="جایگزین کردن" className="btn btn-sm btn-primary irs" />
            </div>  

          </form> 
      );
  }
}

export default ReplacePosition;