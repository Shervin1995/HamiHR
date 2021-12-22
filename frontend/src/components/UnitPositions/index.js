import { MDBIcon } from "mdbreact";
import React, { Component } from "react";
import MyTable from './table'
import services from '../../Axios';


// ----------------------------------------------------
// 
// ----------------------------------------------------
class UnitPositions extends Component {

    constructor(props){
        super(props);

        this.state = {
            rows: null,
            updated: null
        }

        this.getData = this.getData.bind(this)
        this.deletePosition = this.deletePosition.bind(this)
    }

    componentDidMount(){
        this.getData(this.props.match.params.personalCode)
    }

    getData(personalCode){
        services.getUnitPositions(personalCode).then((res) => { 
            this.setState({rows: res.data})
            console.log(res.data);
        }).catch(e => console.log(e));
    }

    deletePosition(userPositionID){ 
        services.deletePosition({userPositionID}).then((res) => { 
            this.setState({updated: res.data});  
            // reload page
            setTimeout(() => {
                window.location.reload()
            }, 1000) 
        }).catch(e => console.log(e)); 
    }

    render() {

        const {rows, updated} = this.state;
console.log(rows);
        if (rows == null ) {
            return(
                <div className="irs">
                    لطفا صبر کنید!
                </div>
            )
        } 
        
        var list = rows.list.map(item => {

            return {
                firstname: item.admin.firstname,
                lastname: `${item.admin.lastname} (${item.title})`,
                personalCode: item.admin.personalCode,
                positionID: item.admin.id,
                id: item.admin.userID,
                born: item.admin.born,
                mobile: item.admin.mobile,
                sex: item.admin.sex,
                shenase: item.admin.shenase,
                createdAt: item.admin.createdAt
            }
        }) 
 
        return (   
            <div className="card"> 
                <div className="p-3 pb-5"> 
                         
                    <div className="mb-5">

                        {/* title */}
                        <h3 className="irs font-weight-bold mb-4">
                            {rows.title}
                        </h3> 
                        {
                            updated ? 
                            <p className="alert alert-success irs border-bottom">
                                <MDBIcon icon="info" className="ml-2" />
                                {updated.message}
                            </p>
                            :
                            null
                        }
                        <hr/>
                        {/* admin */}
                        <p className="font-weight-bold mb-2 irs"> 
                            {
                                !rows.admin.personalCode ?
                                `مدیر کل سازمان: ${rows.admin.firstname} ${rows.admin.lastname} ` 
                                : 
                                rows.admin.personalCode.length == 2 ?
                                `مدیر ارشد: ${rows.admin.firstname} ${rows.admin.lastname} ` 
                                : 
                                rows.admin.personalCode.length == 4 ? 
                                `مدیر داخلی: ${rows.admin.firstname} ${rows.admin.lastname}`
                                : null 
                            }
                        </p>  
                        <p className="font-small mb-2 irs">  
                            کد پرسنلی: {rows.admin.personalCode}
                        </p>  
                        <p className="font-small mb-2 irs">  
                            موبایل: {rows.admin.mobile}
                        </p>    
                        <p className="font-small mb-2 irs">  
                            جنسیت: {rows.admin.sex}
                        </p>   
                        <p className="font-small mb-2 irs">  
                            سال تولد: {rows.admin.born}
                        </p>  
                        <p className="font-small mb-2 irs">  
                            شناسه : {rows.admin.shenase}
                        </p>    

                    </div> 
                    <hr/>
                    <div className="irs">

                        {/* list */}
                        <p className="alert alert-primary font-small mb-2 irs">
                            <MDBIcon icon="info"  className="ml-2" />
                            برای جزئیات بیشتر هر همکار روی ایکون انتهای ردیف کلیک کنید!
                        </p> 

                        <MyTable data={list} deletePosition={this.deletePosition} />

                    </div>

                </div>
            </div>
        );
    }

}

export default UnitPositions;
