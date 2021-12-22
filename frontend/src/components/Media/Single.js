import { MDBIcon } from "mdbreact"
import React, { Component } from "react"
import services from "../../Axios"  
 
import UpdateMediaForm from "./Update";

 

// -------------------------------------------------------
//
// -------------------------------------------------------
class SingleMedia extends Component{
    constructor(props){
        super(props)

        this.state = {
            single: null,
            editingMode: false,
            isCreator: false,
            updated: null
        }

        this.ChangeEditingMode = this.ChangeEditingMode.bind(this)
        this.delete = this.delete.bind(this)

    }

    componentDidMount(){ 
        services.getMedia(this.props.match.params.mediaID).then(res => {
            this.setState({
                single: res.data.media, 
                isCreator: res.data.isCreator
            }) 
        }).catch(e => console.log(e))
    } 

    ChangeEditingMode(){
        this.setState({editingMode: !this.state.editingMode})
    }
 
    delete(id){
        services.deleteMedia({mediaID: id}).then(res => {
            this.setState({updated: res.data.message})
        }).catch(e => console.log(e))
    }

    render(){
        
        const {single, editingMode, isCreator, updated} = this.state;

        if (single == null) {
            return (
                <p className="irs">
                    لطفا صبر کنید!
                </p>
            )
        }  

        if (editingMode) { 
            return (
                <div>
                    <UpdateMediaForm single={single} ChangeMode={this.ChangeEditingMode} />
                </div>
            )
        }

        return(
            <div className="card p-4"> 

                {/* title of page */}
                <div>
                    <p className="alert alert-info irs font-small">
                        <MDBIcon icon="info" className="ml-2" />
                         وارد کننده میتواند اطلاعات فایل را ویرایش کند. مشترکان میتوانند فایل را فقط ببینند!
                    </p> 
                    <h4 className="dark-grey-text irs font-weight-bold">
                        {single.title}
                    </h4> 
                    {
                        isCreator ? 
                        <button className="btn btn-sm btn-warning irs" onClick={this.ChangeEditingMode}>
                            ویرایش 
                        </button>
                        : null
                    }
                    {
                        // isCreator ? 
                        // <button className="btn btn-sm btn-danger irs" onClick={() => this.delete(single.id)}>
                        //     حذف 
                        // </button>
                        // : null
                    }
                    {
                        updated ? 
                        <p className="alert alert-danger irs">
                            {updated}
                        </p> : null
                    }
                    <div className="bg-light rounded p-3 mt-3 irs">
                        <table >
                            <tr>
                                <td className="font-weight-bold py-2 px-3 text-left">عنوان سند: </td>
                                <td>{single.title}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold py-2 px-3 text-left">توضیحات : </td> 
                                <td>{single.description}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold py-2 px-3 text-left">لینک دانلود : </td>
                                <td>
                                    <a className="mr-2" style={{direction: "ltr"}}  href={single.link}> 
                                        {single.link} 
                                    </a>
                                </td> 
                            </tr>
                            <tr>
                                <td className="font-weight-bold py-2 px-3 text-left">وارد کننده : </td>
                                <td>{single.creatorName}</td>
                            </tr>
                            <tr>
                                <td className="font-weight-bold py-2 px-3 text-left">مشترکین : </td>
                                <td>
                                    {
                                        single.shared.map(item => (
                                            <span className="m-1">
                                                {`${item.firstname} ${item.lastname}`} -
                                            </span>
                                        ))
                                    }
                                </td>
                            </tr> 
                        </table>
                    </div> 
                     
                    
                </div>
 

            </div>
        )       
    }
}

export default SingleMedia