import React,{useState,useEffect} from 'react'
import MaterialTable from 'material-table'
import UpdatePosition from "./UpdatePosition"; 
import { MDBIcon } from 'mdbreact';
import './table.css';
import GetUserReports from './getUserReports';
import GetUserTickets from './getUserTickets';

// -------------------------------------
// MyTable
// -------------------------------------
export default function MyTable({data, deleteUser, deletePosition}) {

  const [state, setState] = useState({ })

  // fetchData
  function fetchData(data) {

    setState({

      columns: [  
        {title: ' ', field: 'mobile', cellStyle: {opacity: "0%"}},
        {title: ' ', field: 'joinedDate', cellStyle: {opacity: "0%"}},
        {title: ' ', field: 'born', cellStyle: {opacity: "0%"}},
        {title: ' ', field: 'sex', cellStyle: {opacity: "0%"}},
        {title: ' ', field: 'fullname'},
        {title: ' ', field: 'id'}
      ],

      data: data.reduce((cur, item) => {
            
        cur.push({
            id: item.id,
            fullname: `${item.firstname} ${item.lastname}`,
            mobile: item.mobile,
            born: item.born,
            sex: item.sex,
            personalCode: item.personalCode ? item.personalCode : null,
            shenase: item.shenase,
            positionID: item.positionID ? item.positionID : null
        });

        return cur;

      },[])

    })

  }

  // useEffect
  useEffect( () => {fetchData(data)},[] )
 

  // return
  return (
    <div className="clerkList" style={{direction: "ltr", fontSize:"14px"}}>
    <MaterialTable
      title=" "
      columns={state.columns}
      data={state.data}    
      detailPanel={[
        {
          icon: 'account_circle',
          tooltip: 'اطلاعات پایه',
          render: rowData => {
            return (
              <div className="row irs"
                style={{  
                  padding: 30,
                  paddingRight: 75,
                  backgroundColor: 'lightgray',
                }}
              >
                <div className="col-md-6">
                  <h5 className="font-weight-bold mb-4">اطلاعات پایه</h5>
                  <p>متولد: {rowData.born}</p>
                  <p>شناسه: {rowData.shenase}</p>
                  <p>جنسیت:  {rowData.sex}</p>
                  <p>موبایل:  {rowData.mobile}</p>
                  {
                    rowData.personalCode ? 
                    <p>کد پرسنلی:  {rowData.personalCode}</p>
                    : null
                  }

                  {/* delete user button */}
                  {
                    deleteUser ?  
                    <button className="btn btn-danger btn-sm" 
                    onClick={() => deleteUser(rowData.id)}> 
                      حذف کاربر  
                    </button>
                    : null
                  }
                  {/* delete position button */}
                  {
                    deletePosition ? 
                    <div >
                      <hr/>
                      <button className="btn btn-danger btn-sm" 
                      onClick={() => deletePosition(rowData.positionID)}> 
                        حذف پوزیشن  
                      </button>
                      <p className="alert alert-primary font-tiny">
                        <MDBIcon icon="info" className="ml-2" />
                        اگر این شخص دارای زیرمجموعه باشد 
                        پوزیشن او حذف نمیشود!
                      </p>
                    </div>
                    : null
                  }
                </div>

                {/* update Position Form */}
                {
                    rowData.positionID ? 
                    <div className="col-md-6">
                      <h5 className="font-weight-bold mb-4"> جایگزین </h5>
                      <p> میخواهید شخص دیگری به جای او بنشیند؟ </p>
                      <UpdatePosition positionID={rowData.positionID} /> 
                    </div> : null
                  } 
                
              </div>
            )
          },
        },{
          icon: 'assignment_turnedIn',
          tooltip: 'گزارش کار ها',
          render: rowData => {
            return (
              <div
                style={{ 
                  padding: 30,
                  paddingRight: 75,
                  backgroundColor: 'lightgray',
                }}
              >
                
                {/* get one user reports */}
                <GetUserReports userID={rowData.id} /> 
                 
              </div>
            )
          },
        },{
          icon: 'comment',
          tooltip: 'پیام ها',
          render: rowData => {
            return (
              <div
                style={{ 
                  padding: 30,
                  paddingRight: 75,
                  backgroundColor: 'lightgray',
                }}
              >
                
                {/* get one user reports */}
                <GetUserTickets userID={rowData.id} /> 
                 
              </div>
            )
          },
        }
      ]}
    />
  </div>

  );
}
