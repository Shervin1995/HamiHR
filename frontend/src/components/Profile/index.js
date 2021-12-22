import React, { Component } from "react"; 
import service from "../../Axios"; 
import './index.css';

// -----------------------------------------------
// 
// -----------------------------------------------
class DashProfile extends Component {
  constructor(props) {
    super(props);    
 
  }
  
  changePanel(newPositionID){
    service.changePanel(newPositionID).then((response) => {
      // expired
      localStorage.setItem('psyAccessToken', response.data.token);
      //reload page
      setTimeout(() => {window.location.reload()}, 500);
    }).catch((e) => console.log(e)); 
  }
   
  render() {
    
    var { profile } = this.props; 
    var currentTutorial = profile;
    
    if (currentTutorial === null) {
      return (
        <p className="alert alert-warning irs">
          لطفا خارج شوید و یکبار دیگر وارد شوید!
        </p>
      );
    }

    return (
      <div className="row irs"> 
        {/* column 1 */}
        <div className="col-md-6"> 

          {/* profile */} 
          <div className="card"> 
            <div className="p-3"> 

              <h4 className="mb-4">
                پروفایل 
              </h4>  
            
              <table className="profileTable">
                <tbody>
                  <tr>
                    <td><span>نام: </span></td>
                    <td> {currentTutorial.firstname} </td>
                  </tr>
                  <tr>
                    <td><span> فامیلی: </span></td>
                    <td> {currentTutorial.lastname} </td>
                  </tr>
                  <tr>
                    <td><span> موبایل: </span></td>
                    <td> {currentTutorial.mobile} </td>
                  </tr>
                  <tr>
                    <td><span> جنسیت: </span></td>
                    <td> {currentTutorial.sex} </td>
                  </tr> 
                  <tr>
                    <td><span> سال تولد: </span></td>
                    <td> {currentTutorial.born} </td>
                  </tr>
                  <tr>
                    <td><span> شناسه: </span></td>
                    <td> {currentTutorial.shenase} </td>
                  </tr>
                  {
                    currentTutorial.allPositions.length == 0 ?
                    null : 
                    <tr className=" ">
                      <td><span> پوزیشن ها: </span></td>
                      <td> 
                        {
                          currentTutorial.id == 500 ? 
                          <span style={{ padding: 5, color: "gray"}}>
                            ادمین کل سازمان
                          </span> 
                          : 
                          <ul style={{padding: 0, borderRight: "solid 1px gray", margin: 0}}> 
                          {
                            currentTutorial.allPositions.map((item, i) => (
                              <li key={i+1}
                              style={{textAlign: "left", direction: "ltr", listStyle: "none", fontSize: 18, display: "flex"}}
                              >

                                <code style={{color: "#424242"}}>
                                  {item.personalCode}
                                </code> 
                                
                                { 
                                  currentTutorial.currentPositionID == item.id ? 
                                  <span style={{fontSize: 12, padding: 5, color: "gray"}}>
                                    (پوزیشن کنونی)
                                  </span> 
                                  : 
                                  <button style={{padding: 5}} 
                                  className="btn btn-warning btn-sm" 
                                  onClick={() => this.changePanel(item.id)}
                                  >
                                    تغییر دادن
                                  </button> 
                                }

                              </li>
                            ))
                          }
                          </ul> 
                        } 
                      </td>
                    </tr>
                  }

                </tbody> 
              </table>

            </div> 
          </div>  
        
        </div> 
      </div> 
    );
  }
}

export default DashProfile;
