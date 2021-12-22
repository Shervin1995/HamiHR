import { MDBIcon } from 'mdbreact';
import React,{Component} from 'react'   
import services from '../../Axios';


class AddUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            updated: null
        }

        this.create = this.create.bind(this);

    }

    create(e) { 

        e.preventDefault();
    
        var data1 = {}
        if (e.target[0].value !== "") { data1.firstname = e.target[0].value }
        if (e.target[2].value !== "") { data1.mobile = e.target[2].value }
        if (e.target[3].value !== "") { data1.sex = e.target[3].value }
        if (e.target[1].value !== "") { data1.lastname = e.target[1].value }
        if (e.target[4].value !== "") { data1.born = e.target[4].value }
        if (e.target[5].value !== "") { data1.shenase = e.target[5].value }

        // if nothing new added dont send request
        if (Object.keys(data1).length  === 0) return ;

        services.createClerk(data1).then((res) => {
            this.setState({updated: res.data.message});
            setTimeout(() => {
                window.location.reload()
              }, 2000);
        }).catch(e => console.log(e)); 
    
    }

    render(){
        var {updated} = this.state;

        return( 
        <div className="irs">
            <h5 className="font-weight-bold mb-4">
                افزودن کاربر جدید
            </h5>
            <p className="alert alert-primary font-small">
                <MDBIcon icon="info" className="ml-3"  />
                پس از افزودن کاربر میتوانید به او پوزیشن بدهید!
                 کافیست از منوی سمت راست صفحه گزینه "افزودن پوزیشن" را انتخاب کنید!
            </p>

            <form onSubmit={this.create}>

                <table className="">
                    <tbody>
                        <tr>
                            <td className="p-3">نام: </td>
                            <td> <input type="text" name='firstname' required/> </td>
                        </tr> 
                        <tr>
                            <td className="p-3"> فامیلی: </td>
                            <td><input type="text" name='lastname' required/></td>
                        </tr>
                        <tr>
                            <td className="p-3"> موبایل: </td>
                            <td><input type="text" name='mobile' required /></td>
                        </tr>
                        <tr>
                            <td className="p-3"> جنسیت: </td>
                            <td>
                            <select defaultValue="" name='sex' className="irs" required >
                                <option value=""  disabled>انتخاب کنید ...</option>
                                <option value="مرد"  >
                                    مرد
                                </option>
                                <option value="زن"  >
                                    زن
                                </option>
                            </select>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3"> سال تولد: </td>
                            <td> <input type="number" min="1300" max="1400" name='born' required /> </td>
                        </tr>
                        <tr>
                            <td className="p-3"> شناسه: </td>
                            <td> <input type="text" required /> </td>
                        </tr>
                        <tr> 
                            <td  className="p-3" colSpan="2">
                            <input className="btn btn-success btn-sm" type="submit" value="افزودن" />
                            </td>
                        </tr>
                    </tbody> 
                </table>
            
            </form>
        
            { 
            updated ? 
            <div className="alert alert-success irs m-3"> 
                {updated} 
            </div> 
            : 
            null 
            }

        </div>

        )
    }

}
          

export default AddUser;