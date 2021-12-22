import React, { Component } from "react"
import { createReactEditorJS } from 'react-editor-js'
import "./editor.css" 
import List from '@editorjs/list' 
import Header from '@editorjs/header' 
import demo from './Add-demo' 
import services from "../../Axios"
//

const ReactEditorJS = createReactEditorJS()

// -------------------------------------------
//
// -------------------------------------------
class AddReport extends Component{
  constructor(props){
    super(props);
    
    this.state = {
      output: null,
      updated: null
    }
    this.updateOutput = this.updateOutput.bind(this)
    this.addReport = this.addReport.bind(this)

  }

  addReport(e){
    e.preventDefault();
    let form = e.target;

    var data = {
      output: this.state.output,
      title: form[1].value,
      date: form[0].value
    }

    services.AddReport(data).then(res => {
      this.setState({updated: res.data.message})
    }).catch(e => console.log(e))
 
  }

  updateOutput(e){
    e.saver.save().then(output => { 
      this.setState({output})
    }) 
  }


  
  render(){
    
    const {updated} = this.state;

    // calculating yesterday date   
    var d = new Date() 
    var arr = [new Date()] 
    for (let i = 0; i < 6; i++) {
      arr[i+1] = d.setDate(d.getDate() - 1)
    }  


    return(
      <div className="irs">
            <h3 className="font-weight-bold mb-4">
                افزودن گزارش کار
            </h3>
            <p className=" font-small">
                گزارش کار امروز یا روز های قبل خود را بنویسید!
            </p> 
            <div className="card p-3 bg-light mt-5">
              <form onSubmit={this.addReport}>
                {/* date */} 
                <div className="my-3">
                  تاریخ کار انجام شده: 
                  <select className="mr-2 irs font-small text-left" >
                  {
                    arr.map((item, i) => (
                      <option key={i+1} style={{direction: "ltr"}} value={new Date(item)}>
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
                    type="text" name="title" placeholder="عنوان گزارش" />
                  </h5>
                </div>

                {/* content */} 
                <div className="my-3 bg-white" >
                  <ReactEditorJS 
                    defaultValue={demo}
                    onChange={this.updateOutput} 
                    tools={{  
                        list: List, 
                        header: Header
                    }} 
                  />
                </div>

                {/* submit */} 
                <div className="my-4">
                  <input className="btn btn-primary btn-sm" type="submit" value="ثبت گزارش" />
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

//
export default AddReport;