import React, { Component } from "react"; 
import service from "../../Axios"; 
import OrganizationChart from "@dabeng/react-orgchart";
import Template from "./template";

// -----------------------------------------------
// 
// -----------------------------------------------
class OrgChart extends Component {
  constructor(props) {
    super(props);     

    this.state = { 
        x: []
    };
  }

  componentDidMount(){ 
    service.getOrgChart().then((res) => { 

        if (res.data === 'token is expired!') {
          localStorage.removeItem('psyAccessToken');
          this.props.history.push('/')
        }
        
        this.setState({
          x: res.data
        });   
 

    }).catch((e) => {
        console.log(e);
    }); 
  }
  
   

  render() { 

    const {x} = this.state 

    if (x.length == 0) {
        return (
            <div className=""> 
              {x.length}
            </div> 
          );
    }

    return (
      <div className=""> 
        <OrganizationChart datasource={x[0]} pan={true} zoom={true} NodeTemplate={Template} />
      </div> 
    );
  }
}

export default OrgChart;
