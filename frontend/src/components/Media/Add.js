import React,{Component} from 'react'   
import services from '../../Axios';

// ----------------------------------------------------
// 
// ----------------------------------------------------
class AddMedia extends Component { 
    constructor(props){
        super(props);
        this.state = {
            users: [],
            updated: null
        }

        this.create = this.create.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);

    }

    componentDidMount(){
        this.getAllUsers()
    }

    getAllUsers(){
        services.getAllUsers().then(res => {
            this.setState({users: res.data});
        }).catch(e => console.log(e))
    }

    create(e) { 

        e.preventDefault();
    
        var data1 = {}
        if (e.target[0].value !== "") { data1.title = e.target[0].value }
        if (e.target[1].value !== "") { data1.link = e.target[1].value }
        if (e.target[2].value == "sd") { data1.shared = [] } else {data1.shared = e.target[2].value}
        if (e.target[3].value !== "") { data1.description = e.target[3].value } 
 
        if (Object.keys(data1).length !== 4) {
            alert("تمام فیلد ها الزامی است!")
        }
        services.addMedia(data1).then((res) => {
            this.setState({updated: res.data.message}); 
        }).catch(e => console.log(e)); 
    
    }

    render(){

        var {users, updated} = this.state;
        

        return( 
        <div className="irs"> 
            <h5 className="font-weight-bold mb-4">
                افزودن سند
            </h5>
            <p className="font-small">
                اینجا میتوانید مشخصات یک pdf را وارد نمایید. 
            </p>

            <form onSubmit={this.create}>

                <table className="">
                    <tbody>
                        <tr>
                            <td className="p-3">عنوان: </td>
                            <td> <input type="text" name='firstname' required/> </td>
                        </tr> 
                        <tr>
                            <td className="p-3"> لینک: </td>
                            <td><input type="text" name='lastname' required/></td>
                        </tr>
                        <tr>
                            <td className="p-3"> گیرنده: </td>
                            <td>
                                <select defaultValue="sd" className="irs" required >
                                    <option value="sd" key="1" disabled>
                                        انتخاب کنید ...
                                    </option>
                                    {
                                        users.map((user, i) => (
                                            <option value={user.id} key={i+1} >
                                                {user.firstname + ' ' + user.lastname}
                                            </option>
                                        ))
                                    } 
                                </select>
                            </td>
                        </tr> 
                        <tr>
                            <td className="p-3"> توضیحات: </td>
                            <td><input type="text" name='mobile' required /></td>
                        </tr>
                        <tr> 
                            <td  className="p-3" colSpan="2">
                                <input className="btn btn-primary btn-sm" type="submit" value="افزودن" />
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
          

export default AddMedia;