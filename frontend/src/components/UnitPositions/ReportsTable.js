import React,{useState,useEffect} from 'react'
import MaterialTable from 'material-table'
import { Link } from 'react-router-dom';
import { MDBIcon } from 'mdbreact'; 

import './ReportsTable.css';

// -------------------------------------
// MyTable
// -------------------------------------
export default function MySecondTable({reports}) {

  const [state, setState] = useState({ })

  // fetchData
  function fetchData() {

    setState({

      columns: [  
        {title: ' ', field: 'single' }, 
        {title: ' ', field: 'title' },
        {title: ' ', field: 'date'},
        {title: ' ', field: 'id'}
      ],

      data: reports.reduce((cur, report, i) => {
            
        cur.push({
            id: i+1,
            date: new Date(report.date).toLocaleDateString("fa"), 
            title: report.title,
            single: 
            <Link to={`/auth/reports/${report.id}`} >
                <MDBIcon icon="info-circle"  style={{fontSize: "20px"}} />
            </Link>
        });

        return cur;

      },[])

    })

  }

  // useEffect
  useEffect( () => {fetchData()},[] )

  // return
  return (
    <div className="UserReportsList  d-flex justify-content-around irs" style={{direction: "ltr", fontSize:"14px"}}>
      <div style={{width: "100%"}}>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}    
    />
  </div>
  </div>

  );
}
