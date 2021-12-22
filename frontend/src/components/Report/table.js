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
        {title: ' ', field: 'view'},
        {title: ' ', field: 'title', cellStyle: {direction: "rtl"}},
        {title: ' ', field: 'date'},
        {title: ' ', field: 'day'},
        {title: ' ', field: 'id'},
      ],

      data: data.map(single => {

        return {
          id: single.id,
          date: new Date(single.date).toLocaleDateString("fa"),
          day: [
            "یکشنبه",
            "دوشنبه",
            "سه شنبه",
            "چهارشنبه",
            "پنجشنبه",
            "جمعه",
            "شنبه",
          ][new Date(single.date).getDay()],
          title: single.title,
          view: 
            <Link to={`/auth/reports/${single.id}`} >
              <MDBIcon icon="eye" className="font-lg" />
            </Link>
        }
      })

    })

  }

  // useEffect
  useEffect( () => {fetchData()},[] )

  // return   
  return (
    <div className="ReportList " style={{direction: "ltr", fontSize:"14px"}}>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}  
    />
  </div>

  );
} 
