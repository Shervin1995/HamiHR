import { MDBIcon } from 'mdbreact';
import React,{Component} from 'react'   
import services from '../../Axios';
import MyTable from "../UnitPositions/table"

// ----------------------------------------
// no position
// ----------------------------------------
class NoPosition extends Component {

    constructor(props){
        super(props);
        this.state = {
            nopositions: null,
            updated: null
        }

        this.delete = this.delete.bind(this);
        this.getNoPositions = this.getNoPositions.bind(this);

    }

    componentDidMount(){ 
        this.getNoPositions()
    } 

    getNoPositions(){
        services.getNoPosition().then((res) => {
            this.setState({nopositions: res.data})
        }).catch(e => console.log(e));
    }

    delete(id){
        
        services.deleteClerk({userID: id}).then((res) => {
            this.setState({updated: res.data})
            
            // refresh list
            this.getNoPositions();

        }).catch(e => console.log(e));
    }

    render(){

        var {updated, nopositions} = this.state;
 
        return( 
                
            <div className="irs">

                <h5 className="font-weight-bold mb-4">
                    لیست کاربران بی پوزیشن
                </h5>
                <p className="alert alert-primary font-small">
                    <MDBIcon icon="info" className="ml-3"  />
                    این کاربران تعریف شده اند اما هنوز پوزیشنی به انها اختصاص داده نشده است. 
                    میتوانید از منوی کناری گزینه "افزودن پوزیشن" را انتخاب کنید 
                    و یک پوزیشن را به انها اختصاص دهید یا این افراد را حذف کنید!
                </p> 
                
                { 
                updated ? 
                <div className="alert alert-success irs m-3"> 
                    {updated.message} 
                </div> 
                : null 
                }

                {
                    nopositions == null ? 
                    "چند لحظه صبر کنید!"
                    :
                    nopositions.length == 0 ? 
                    "همه افراد سازمان پوزیشن دارند! "
                    :
                    <MyTable data={nopositions} deleteUser={this.delete} />  
                } 

            </div>

        )
    }

}
          

export default NoPosition;