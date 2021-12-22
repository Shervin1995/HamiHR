import React, { Component } from "react"
import services from "../../Axios" 
import edjsHTML from "editorjs-html";
import ReactHtmlParser from 'react-html-parser'; 
 
import UpdateReportForm from "./Update";


const edjsParser = edjsHTML();

// -------------------------------------------------------
//
// -------------------------------------------------------
class SingleReport extends Component{
    constructor(props){
        super(props)
        this.state = {
            single: null,
            editingMode: false,
            isHimself: false
        }
        this.ChangeEditingMode = this.ChangeEditingMode.bind(this)
    }

    componentDidMount(){ 
        services.getReport(this.props.match.params.reportID).then(res => {
            this.setState({
                single: res.data.report, 
                isHimself: res.data.isHimself
            })
        }).catch(e => console.log(e))
    } 

    ChangeEditingMode(){
        this.setState({editingMode: !this.state.editingMode})
    }
 

    render(){
        
        const {single, editingMode, isHimself} = this.state;

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
                    <UpdateReportForm single={single} ChangeMode={this.ChangeEditingMode} />
                </div>
            )
        }

        return(
            <div className="card p-4"> 

                {/* title of page */}
                <div>
                    <h4 className="dark-grey-text irs font-weight-bold">
                        {single.title}
                    </h4>
                    <p className="irs grey-text">
                        گزارش کار 
                        {' '}
                        {
                        [
                            "یکشنبه",
                            "دوشنبه",
                            "سه شنبه",
                            "چهارشنبه",
                            "پنجشنبه",
                            "جمعه",
                            "شنبه",
                            ][new Date(single.date).getDay()]
                        } {'  '}
                        {new Date(single.date).toLocaleDateString("fa")} 
                    </p>
                    {
                        isHimself ? 
                        <button className="btn btn-sm btn-warning irs" onClick={this.ChangeEditingMode}>
                            ویرایش این گزارش
                        </button>
                        : null
                    }
                    
                </div>

                {/* report html */}
                <div className="bg-light p-3 rounded dark-grey-text irs">
                    {edjsParser.parse(single.output).map(htmlTag => ReactHtmlParser(htmlTag))}
                </div>

            </div>
        )       
    }
}

export default SingleReport