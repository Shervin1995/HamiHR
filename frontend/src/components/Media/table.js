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
        {title: ' ', field: 'id'},
      ],

      data: data.map((single, i) => ({
          id: i + 1,
          title: single.title,
          view: 
            <Link to={`/auth/medias/${single.id}`} >
              <MDBIcon icon="info-circle" style={{fontSize: 20}} />
            </Link>,
      }))

    }) 

  }

  // useEffect
  useEffect( () => {fetchData(data)},[] )

  // return   
  return (
    <div className="medialist " style={{direction: "ltr", fontSize:"14px"}}>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}  
    />
  </div>

  );
} 
