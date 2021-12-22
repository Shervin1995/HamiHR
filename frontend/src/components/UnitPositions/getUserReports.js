import React, { Component } from "react";
import MySecondTable from "./ReportsTable";
import services from "../../Axios"

// --------------------------------------------
//
// --------------------------------------------
export default class GetUserReports extends Component{
    constructor(props){
        super(props);
        this.state = {
            reports: null
        }
    }

    componentDidMount(){
        services.getUserReports(this.props.userID).then(res => {
            this.setState({reports: res.data})
        }).catch(e => console.log(e))
    }

    render(){

        const {reports} = this.state

        if (!reports) {
            return(
                "لطفا صبر کنید!"
            )
        }

        return(
            <MySecondTable reports={reports} />
        )
    }

}