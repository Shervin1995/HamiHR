import React, { Component } from "react";
import services from "../../Axios"
import MyTable from "./table";

// ----------------------------------------
// Sandogh Payamha
// ----------------------------------------
class Sandogh extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount(){
        services.getAllTickets().then(res => {
            this.setState({list: res.data})
        }).catch(e => console.log(e));
    }

    render(){

        const {list} = this.state;

        return(
            <div className="irs">
                <div>
                    <h4 className="font-weight-bold"> صندوق پیام ها </h4>
                    <p className="font-small ">
                        اینجا پیام هایی که ارسال کردید یا به شما نوشته اند دیده میشود.
                    </p>
                </div>
                <div className="mt-4">
                    {list.length !== 0 ? <MyTable data={list} /> : null}
                </div>
            </div>
            
        )
    }
}

//
export default Sandogh;