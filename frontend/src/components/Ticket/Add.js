import React, {Component} from "react"

import { createReactEditorJS } from 'react-editor-js'
import "../Report/editor.css" 
import List from '@editorjs/list' 
import Header from '@editorjs/header'  
import services from "../../Axios"
import {MDBIcon} from "mdbreact"

import "./Add.css"

const ReactEditorJS = createReactEditorJS()

// -------------------------------------------------------
//
// -------------------------------------------------------
class AddTicket extends Component{
    constructor(props){
        super(props)

        this.state = {
            list: null,
            contacts: [],
            title: null,
            output: null, 
            allMedia: [],
            selectedMedia: [],
            updated: null
          }

        this.updateOutput = this.updateOutput.bind(this)
        this.AddContact = this.AddContact.bind(this)
        this.AddTitle = this.AddTitle.bind(this)
        this.writeTicket = this.writeTicket.bind(this) 
        this.addSelectedMedia = this.addSelectedMedia.bind(this)
        this.removeFromSelectedMedia = this.removeFromSelectedMedia.bind(this)
    }


    componentDidMount(){

        //
        services.getTicketUsers().then(res => {
            this.setState({list: res.data })
          }).catch(e => console.log(e))

        //
        services.getAllMedia().then(res => {
            this.setState({allMedia: res.data});
        }).catch(e => console.log(e))

    }

    AddContact(e){
        var contacts = this.state.contacts;
        var pc = e.target.value;

        if (e.target.checked) {
            contacts.push(pc) 
            this.setState({contacts})
        } else { 
            let index = contacts.indexOf(pc)
            if (index > -1){ contacts.splice(index, 1) }
            this.setState({contacts})
        }
    }

    AddTitle(e){
        this.setState({title: e.target.value})
    }

    writeTicket(){
    
        var data = {
          content: this.state.output,
          title: this.state.title,
          contacts: JSON.stringify(this.state.contacts),
          media: JSON.stringify(this.state.selectedMedia.map(i => i.id))
        }

        services.writeTicket(data).then(res => {
          this.setState({updated: res.data.message})
        }).catch(e => console.log(e))
     
    }

    updateOutput(e){
        e.saver.save().then(output => { 
            this.setState({output})
        }) 
    }

    
    addSelectedMedia(e){

        // remove from allMedia
        // add to selected media

        var mediaID = e.target.value 

        var allMedia = this.state.allMedia
        var media = allMedia.find(media => media.id == mediaID);
        var index = allMedia.findIndex(media => media.id == mediaID);
        allMedia.splice(index, 1)

        var selectedMedia = this.state.selectedMedia
        selectedMedia.push(media) 
        
        this.setState(prevState => ({ 
                ...prevState,
                selectedMedia,
                allMedia
        }))

    }

    removeFromSelectedMedia(id){
        
        // remove from selected media
        // add to all media
  
        var selectedMedia = this.state.selectedMedia
        var media = selectedMedia.find(media => media.id == id);
        var index = selectedMedia.findIndex(media => media.id == id);
        selectedMedia.splice(index, 1)

        var allMedia = this.state.allMedia
        allMedia.push(media) 
        
        this.setState(prevState => ({ 
                ...prevState,
                selectedMedia,
                allMedia
        }))

    }
    
    
    render(){

        const {selectedMedia, allMedia, list, updated} = this.state;

        
        return(
            <div className="irs">
                <h4 className="font-weight-bold"> ارسال پیام </h4>
                <p> میتوانید از اینجا پیام بفرستید! </p>
                <div className="row my-4">

                    {/* contacts */}
                    <div className="col-md-4 card bg-light p-3 pr-5">  
                    {
                        !list ? "لطفا صبر کنید!" : list.map((item, i) => ( 
                            <div class="custom-control custom-checkbox my-1">
                                <input type="checkbox" class="custom-control-input" id={i+1} 
                                onClick={this.AddContact} value={item.personalCode} />
                                <label class="custom-control-label irs font-small" for={i+1}>
                                    {item.fullname} <code style={{color: "gray"}}>({item.personalCode})</code>
                                </label>
                            </div>
                        ))
                    } 
                    </div> 

                    {/* free space */}
                    <div className="col-md-1"></div>

                    {/* title & content */}
                    <div className="col-md-7 card bg-light">  
                        
                        {/* title */} 
                        <div className="my-3">
                            <h5>
                                <input 
                                className="mr-2 " 
                                style={{width: 400}} 
                                type="text" 
                                name="title" 
                                placeholder="عنوان پیام" 
                                onKeyUp={this.AddTitle}
                                />
                            </h5>
                        </div>

                        {/* content */} 
                        <div className="mb-3 bg-white rounded" >
                            <ReactEditorJS  
                                onChange={this.updateOutput} 
                                tools={{  
                                    list: List, 
                                    header: Header
                                }} 
                            />
                        </div> 

                        {/* attachment */}
                        <div className="mb-3 p-2 bg-white rounded" >

                            {/* selected media */}
                            <div className="mb-3 " >
                                <span className="ml-2 font-weight-bold grey-text">
                                    ضمیمه: 
                                </span>
                                {
                                    selectedMedia.length == 0 ? null : selectedMedia.map(item => (
                                        <span className="m-1 border border-dark rounded p-1 font-small">
                                            <MDBIcon icon="times" 
                                            className="text-danger p-1 ml-1" 
                                            style={{cursor: "pointer"}}
                                            onClick={() => this.removeFromSelectedMedia(item.id)} 
                                            />
                                            { item.title }
                                        </span>
                                    ))
                                }
                            </div> 

                            {/* all media */}
                            <div className="mb-2" >
                                <span className="ml-2 font-weight-bold grey-text">
                                    افزودن به ضمیمه: 
                                </span>
                                <select className="font-small irs" > 
                                    {
                                        allMedia.length == 0 ? null : allMedia.map(item => (
                                            <option className="font-small irs" value={item.id} onClick={this.addSelectedMedia}>
                                                { item.title }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div> 

                        </div> 


                    </div>

                    {/* submit */}
                    <div className="col-md-12 text-center my-4">
                        <button className="btn btn-primary " onClick={this.writeTicket}>
                            ارسال پیام
                        </button>
                    </div>

                    {
                        updated ? 
                        <p className="alert alert-success">
                            {updated}
                        </p> : null
                    } 

                </div>
            </div>
        )
    }
}

//
export default AddTicket