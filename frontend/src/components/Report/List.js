import React, { Component } from "react"
import services from "../../Axios"
import MyTable from "./table"

//
//
//
class ReportList extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: null
        }
    }

    componentDidMount(){
        services.getReports().then(res => {
            this.setState({list: res.data})
        }).catch(e => console.log(e))
    }
 

    render(){
        
        const {list} = this.state;

        return(
            <div> 

                {/* title of page */}
                <div>
                    <h4 className="irs font-weight-bold">
                        لیست گزارش کار ها
                    </h4>
                    <p className="irs">
                        این لیست گزارشکار هایی است که شما نوشتید. 
                    </p>
                </div>

                {/* table */}
                {
                    list == null || list.length == 0 ? 
                    
                    <div className="irs">
                        هیچ گزارشی نوشته نشده است.
                    </div>
                    : 
                    <div className="irs">
                        <MyTable data={list.reverse()}  />
                    </div>
                }

            </div>
        )       
    }
}

export default ReportList