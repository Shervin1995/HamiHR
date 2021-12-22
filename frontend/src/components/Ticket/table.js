import React,{useState,useEffect} from 'react'
import MaterialTable from 'material-table'   
import './table.css';
import { MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

// -------------------------------------
// MyTable
// -------------------------------------
export default function MyTable({data}) {

  const [state, setState] = useState({ })

  // fetchData
  function fetchData() {

    setState({

      columns: [    
        {title: ' ', field: 'notSeenResponsesCount'},
        {title: ' ', field: 'isSeen'},
        {title: ' ', field: 'view'},
        {title: ' ', field: 'title', cellStyle: {direction: "rtl"}},
        {title: ' ', field: 'date'},
        {title: ' ', field: 'sender'},
        {title: ' ', field: 'id'},
      ],

      data: data.map((single, i) => ({
          id: i + 1,
          sender: `${single.user.firstname} ${single.user.lastname}`,
          date: new Date(single.date).toLocaleString("fa"),
          title: single.title,
          view: 
            <Link to={`/auth/tickets/${single.id}`} >
              <MDBIcon icon="info-circle" style={{fontSize: 20}} />
            </Link>,
          isSeen: 
            <div>
              {
                single.seen ? 
                <MDBIcon icon="envelope-open-text" className="pink-text" style={{fontSize: 20}} />
                : 
                <MDBIcon icon="envelope" className="grey-text" style={{fontSize: 20}} />
              } 
            </div>,
          notSeenResponsesCount:  single.notSeenResponsesCount == 0 ? null :
              <div className="badge rounded-pill bg-danger p-1" style={{fontSize: "12px"}}>
                 {single.notSeenResponsesCount} 
              </div>
      }))

    })

  }

  // useEffect
  useEffect( () => {fetchData()},[] )

  // return   
  return (
    <div className="TicketsList " style={{direction: "ltr", fontSize:"14px"}}>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}  
    />
  </div>

  );
} 
