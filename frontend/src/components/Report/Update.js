import React, { Component } from "react"
import services from "../../Axios"   

import { createReactEditorJS } from 'react-editor-js'
import "./editor.css" 
import List from '@editorjs/list' 
import Header from '@editorjs/header'   

const ReactEditorJS = createReactEditorJS()

//
//
//
class UpdateReportForm extends Component{
    constructor(props){
        super(props)
        this.state = { 
            output: null,
            updated: null
        }
        this.updateOutput = this.updateOutput.bind(this)
        this.updateReport = this.updateReport.bind(this)

    } 

    updateReport(e){
        e.preventDefault();
        let form = e.target;
    
        if (this.state.output == null) {
            alert("باید محتوای گزارش را تغییر دهید! یک تغییر کوچک مانند space هم کافیست!");
        } else {
            var data = {
                reportID: this.props.single.id,
                output: this.state.output,
                title: form[1].value,
                date: form[0].value
            }
            console.log(data);
            services.UpdateReport(data).then(res => {
            this.setState({updated: res.data.message})
            }).catch(e => console.log(e))
        } 
    }
    
    updateOutput(e){
        e.saver.save().then(output => { 
            this.setState({output})
            console.log(output);
        }) 
    }
 

    render(){
        
        const {single, ChangeMode} = this.props; 
        const {updated} = this.state; 
            

        // calculating yesterday date   
        var d = new Date() 
        var arr = [new Date()] 
        for (let i = 0; i < 6; i++) {
        arr[i+1] = d.setDate(d.getDate() - 1)
        }  
        
        return (
            <div className="irs">
                <h3 className="font-weight-bold mb-4">
                    ویرایش گزارش کار
                </h3>
                <p className=" font-small">
                    میتوانید تاریخ، عنوان یا محتوای گزارش را تغییر دهید!
                </p> 
                <div className="card p-3 bg-light mt-5">
                <form onSubmit={this.updateReport}>

                    {/* date */}  
                    <div className="my-3"> 
                        تاریخ کار انجام شده:   
                        <select className="mr-2 irs font-small text-left" >

                        <option key="1" style={{direction: "ltr"}} value={single.date}>
                            {'تاریخ ثبت شده - '}
                            {new Date(single.date).toLocaleDateString("fa")}
                        </option> 

                        {
                            arr.map((item, i) => (
                            <option key={i+2} style={{direction: "ltr"}} value={new Date(item)}>
                            {i == 0 ? "امروز" : i == 1 ? "دیروز" : [
                                "یکشنبه",
                                "دوشنبه",
                                "سه شنبه",
                                "چهارشنبه",
                                "پنجشنبه",
                                "جمعه",
                                "شنبه",
                            ][new Date(item).getDay()]} {' - '}
                            {new Date(item).toLocaleDateString("fa")}
                            </option> 
                            ))
                        } 

                        </select> 
                    </div>

                    {/* title */} 
                    <div className="my-3">
                        <h5>
                            <input className="mr-2 " style={{width: 400}}
                            type="text" name="title" placeholder="عنوان گزارش" 
                            defaultValue={single.title} 
                            />
                        </h5>
                    </div>

                    {/* content */} 
                    <div className="my-3 bg-white" >
                        <ReactEditorJS 
                            defaultValue={single.output}
                            onChange={this.updateOutput} 
                            tools={{  
                                list: List, 
                                header: Header
                            }} 
                        />
                    </div>

                    {/* submit */} 
                    <div className="my-4">
                        <input className="btn btn-primary btn-sm" type="submit" value="به روز رسانی گزارش" />
                            
                        <button className="btn btn-sm btn-primary irs" onClick={ChangeMode}>
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

export default UpdateReportForm