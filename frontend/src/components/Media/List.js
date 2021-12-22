import React, { Component } from "react";
import services from "../../Axios"
import MyTable from "./table";

// ----------------------------------------
// Media List
// ----------------------------------------
class MediaList extends Component{
    constructor(props){
        super(props);
        this.state = {
            list: [],
            updated: null
        }
    }

    componentDidMount(){
        services.getAllMedia().then(res => {
            if (res.data.message) {
                this.setState({updated: res.data.message})
            }
            this.setState({list: res.data}) 
        }).catch(e => console.log(e));
    }

    render(){

        const {list, updated} = this.state;
 

        return(
            <div className="irs">
                <div>
                    <h4 className="font-weight-bold"> 
                        لیست اسناد
                    </h4>
                    <p className="font-small ">
                        لیست اسنادی که برای شماست.
                    </p>
                </div>
                <div className="mt-4">
                    {
                        updated ? updated : 
                        list.length !== 0 ? <MyTable data={list} /> : "بدون سند!"
                    }
                </div>
            </div>
            
        )
    }
}

//
export default MediaList;