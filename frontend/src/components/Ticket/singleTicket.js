import React, { Component } from "react";
import { Link } from "react-router-dom";
import edjsHTML from "editorjs-html";
import ReactHtmlParser from 'react-html-parser'; 
import services from "../../Axios"

import { createReactEditorJS } from 'react-editor-js'
import "../Report/editor.css" 
import List from '@editorjs/list' 
import Header from '@editorjs/header'  
import { MDBIcon } from "mdbreact";
//

const ReactEditorJS = createReactEditorJS()
const edjsParser = edjsHTML();

// -----------------------------------------------
// 
// -----------------------------------------------
class SingleTicket extends Component{
    constructor(props){
        super(props)

        this.state = {
            single: null,
            output: null,
            updated: null
        }
        this.updateOutput = this.updateOutput.bind(this)
        this.addTicket = this.addTicket.bind(this)
        this.fetch = this.fetch.bind(this)
    }

    componentDidMount(){ 
        this.fetch()  
        // seen
        services.justSeen({ticketID: this.props.match.params.ticketID}).then(res => {
            console.log(res.data);
            // refresh
            this.props.reProfile()
        }).catch(res => console.log(res.data))
    }
  
    fetch(){ 
        services.getSingleTicket(this.props.match.params.ticketID).then(res => {
            this.setState({single: res.data})
        }).catch(e => console.log(e))
    }
 
    addTicket(){ 

        if (!this.state.output) {
            return alert("پاسخ خالی ارسال نمیشود!")
        }

        var data = {
            content: this.state.output,
            ticketID: this.props.match.params.ticketID
        }

        services.writeResponse(data).then(res => {
            this.setState({updated: res.data.message})
            this.fetch()
        }).catch(e => console.log(e))
    
    }

    updateOutput(e){
        e.saver.save().then(output => { 
        this.setState({output})
        }) 
    }

    render(){

        const {single, updated} = this.state 

        if (!single) {
            return("لطفا صبر کنید!")
        }

        const ticket = single.ticket
        const responses = single.responses

        return(
            <div className="card p-4"> 

                {/* --------------------------- */}
                {/* ticket info */}
                {/* --------------------------- */}
                <div>
                    <h4 className="dark-grey-text irs font-weight-bold">
                        {ticket.title}
                    </h4>
                    <p className="irs mb-0">
                        توسط  
                        {' '}
                        {ticket.fullname} 
                    </p>
                    <p className="irs grey-text font-small mb-0"> 
                        {
                        [
                            "یکشنبه",
                            "دوشنبه",
                            "سه شنبه",
                            "چهارشنبه",
                            "پنجشنبه",
                            "جمعه",
                            "شنبه",
                            ][new Date(ticket.date).getDay()]
                        } {'  '}
                        {new Date(ticket.date).toLocaleDateString("fa")} 
                        {' - '}
                         ساعت
                        {'  '}
                        {new Date(ticket.date).toLocaleTimeString("fa")}
                    </p> 
                    <p className="irs grey-text font-small"> 
                        گیرنده: 
                        {' '}{
                            ticket.contacts.map(contact => 
                                <span className={ticket.seen.includes(contact.id) ? "pink-text" : null}>
                                    {ticket.seen.includes(contact.id) ? 
                                    <MDBIcon icon="check" className="ml-1" /> : null}
                                    {contact.firstname + ' ' + contact.lastname + ' - '}
                                </span>
                            )
                        }
                    </p> 
                </div>

                {/* content html */}
                <div className="bg-light p-3 rounded dark-grey-text irs">
                    {edjsParser.parse(ticket.content).map(htmlTag => ReactHtmlParser(htmlTag))}
                </div>

                {/* media attachment */}
                <div className="bg-light p-3 rounded dark-grey-text irs mt-2" >
                    <span className="font-weight-bold grey-text ml-2">
                        ضمیمه: 
                    </span>
                    {
                        ticket.medias.map(media => (
                            <span className="ml-2">
                                <Link to={`/auth/medias/${media.id}`}>
                                    {media.title}
                                </Link> ,
                            </span>
                        ))
                    }
                </div>

                {/* --------------------------- */}
                {/* responses */}
                {/* --------------------------- */}
                {
                    responses.map(response => (
                        <div className="pt-4 px-5">

                            {/* responder */}
                            <p className="irs mb-0">
                                پاسخ: 
                                { ' ' + 
                                response.responder.firstname + ' ' +
                                response.responder.lastname
                                }
                            </p>

                            {/* responder */}
                            <p className="irs grey-text font-small "> 
                                {
                                [
                                    "یکشنبه",
                                    "دوشنبه",
                                    "سه شنبه",
                                    "چهارشنبه",
                                    "پنجشنبه",
                                    "جمعه",
                                    "شنبه",
                                    ][new Date(response.date).getDay()]
                                } {'  '}
                                {new Date(response.date).toLocaleDateString("fa")} 
                                {' - '}
                                ساعت
                                {'  '}
                                {new Date(response.date).toLocaleTimeString("fa")}
                            </p> 
                            
                            {/* content  */}
                            <div className="bg-light p-3 rounded dark-grey-text irs">
                                {
                                response.content.blocks !== undefined ? edjsParser.parse(response.content).map(htmlTag => 
                                    ReactHtmlParser(htmlTag)
                                ) : null
                                }
                            </div>
                            
                        </div>
                    ))
                }

                {/* --------------------------- */}
                {/* Add Response */}
                {/* --------------------------- */}
                <div className="pt-4 px-5">
                    <h6 className="irs font-weight-bold">
                        افزودن پاسخ
                    </h6> 
                    {
                        updated ?
                        <p className="alert alert-success irs">
                        {updated}
                        </p> : null
                    }
                    <div className="my-3 bg-light rounded irs">
                        <ReactEditorJS 
                            onChange={this.updateOutput} 
                            tools={{list: List, header: Header}} 
                        />
                    </div>
                        
                    {/* submit */} 
                    <div className="my-4">
                        <button className="irs btn btn-primary btn-sm" onClick={this.addTicket}>
                            ثبت پاسخ
                        </button>
                    </div>

                </div>


            </div>
        )

    }
}

export default SingleTicket