import React, { Component } from "react";
import TicketsTable from "./TicketsTable";
import services from "../../Axios"

// --------------------------------------------
//
// --------------------------------------------
export default class GetUserTickets extends Component{
    constructor(props){
        super(props);
        this.state = {
            tickets: null
        }
    }

    componentDidMount(){
        services.getAllTickets_User(this.props.userID).then(res => {
            this.setState({tickets: res.data})
        }).catch(e => console.log(e))
    }

    render(){

        const {tickets} = this.state

        if (!tickets) return("لطفا صبر کنید!")

        return <TicketsTable tickets={tickets} />
        
    }

}