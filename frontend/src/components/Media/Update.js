import React, { Component } from "react"
import services from "../../Axios"   
import { MDBIcon } from "mdbreact"
 

// 
class UpdateMediaForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            shared: [],
            updated: null
        } 
        this.updateMedia = this.updateMedia.bind(this)
        this.addShared = this.addShared.bind(this)
        this.removeFromShared = this.removeFromShared.bind(this)

    } 

    componentDidMount(){

        var shared = this.props.single.shared;

        services.getAllUsers().then(res => {

            var allusers = res.data;
              
            var someusers = allusers.reduce((cur, user) => {  
                var moshtarak = shared.findIndex(x => x.id == user.id)
                if (moshtarak == -1) { cur.push(user) }
                return cur;
            }, [])
 
            this.setState({
                users: someusers,
                shared: shared
            });

        })
    }
    
    addShared(e){ 

        // remove from users 
        // add to shared

        var userID = e.target.value 

        var users = this.state.users
        var user = users.find(user => user.id == userID);
        var index = users.findIndex(user => user.id == userID);
        users.splice(index, 1)

        var shared = this.state.shared
        shared.push(user) 
        
        this.setState(prevState => ({ 
                ...prevState,
                shared,
                users
        }))
 
    }

    removeFromShared(id){

        // remove from shared 
        // add to users 
        
        this.setState(prevState => {

            var shared = prevState.shared;
            var share = shared.find(user => user.id == id);
            var index = shared.findIndex(user => user.id == id);
            shared.splice(index, 1);

            var users = prevState.users
            users.push(share);
            
            return {
                ...prevState,
                shared,
                users
            }
        }) 

    }

    updateMedia(e){
        e.preventDefault();
        let form = e.target;

        var data = {
            shared: this.state.shared.map(user => user.id),
            mediaID: this.props.single.id, 
            title: form[0].value,
            link: form[1].value,
            description: form[2].value
        }
        
        console.log(data);

        services.updateMedia(data).then(res => {
            this.setState({updated: res.data.message})
        }).catch(e => console.log(e))

    }
     
 

    render(){
        
        const {single, ChangeMode} = this.props; 
        const {users, shared, updated} = this.state;  
 
        
        return (
            <div className="irs">
                <h3 className="font-weight-bold mb-4">
                    ویرایش  سند
                </h3>
                <p className=" font-small">
                    میتوانید عنوان، توضیحات، لینک یا مشترکین را عوض کنید!
                </p> 
                <div className="card p-3 bg-light mt-5">
                <form onSubmit={this.updateMedia}>
 

                    {/* title */} 
                    <div className="my-3">
                        <p>
                            <span className="ml-2 font-weight-bold">
                                عنوان سند: 
                            </span>
                            <input className="mr-2 " style={{width: 400}}
                            type="text" name="title"  
                            defaultValue={single.title} 
                            />
                        </p> 
                        <p>
                            <span className="ml-2 font-weight-bold">
                                 لینک دانلود: 
                            </span>
                            <input className="mr-2 font-small " style={{width: 400}}
                            type="text" name="title"  
                            defaultValue={single.link} 
                            />
                        </p>
                        <p>
                            <span className="ml-2 font-weight-bold">
                                توضیحات: 
                            </span>
                            <input className="mr-2 " style={{width: 400}}
                            type="text" name="title"  
                            defaultValue={single.description} 
                            />
                        </p> 
                        <div>

                            {/* list shared  */}
                            <div className="mb-4">
                                <span className="ml-2 font-weight-bold">
                                    مشترکین: 
                                </span>
                                {
                                    shared.length == 0 ? null : shared.map(item => (
                                        <span className="m-1 border border-dark rounded p-1 font-small">
                                            <MDBIcon icon="times" 
                                            className="text-danger p-1 ml-1" 
                                            style={{cursor: "pointer"}}
                                            onClick={() => this.removeFromShared(item.id)} 
                                            />
                                            {`${item.firstname} ${item.lastname}`}
                                        </span>
                                    ))
                                }
                            </div>

                            {/* list users  */}
                            <div>
                                <span className="ml-2 font-weight-bold">
                                    افزودن به مشترکین: 
                                </span>
                                <select className="font-small irs" > 
                                    {
                                        users.length == 0 ? null : users.map(user => (
                                            <option className="font-small irs" value={user.id} onClick={this.addShared}>
                                                {`${user.firstname} ${user.lastname}`}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                        </div>
                    </div>
 

                    {/* submit */} 
                    <div className="my-4">
                        <input className="btn btn-primary btn-sm" type="submit" value="به روز رسانی سند" />
                            
                        <button className="btn btn-sm btn-warning irs" onClick={ChangeMode}>
                            انصراف
                        </button>
                    </div>

                </form>
                </div>
            
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

export default UpdateMediaForm