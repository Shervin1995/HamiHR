import { MDBIcon } from "mdbreact";
import React, { Component } from "react"; 
import services from "../../Axios"

// --------------------------------------------------------
// SpecialPsychologist
// --------------------------------------------------------
class AddTwoForm extends Component {
    constructor(props) {
      super(props);    
      this.state =  {
        updated: null
      }
      this.addPosition = this.addPosition.bind(this)
    }  
 

    addPosition(e){
      e.preventDefault();
      var form = e.target;

      if (form[0].value == "sd") {
        return alert("لطفا یک کاربر را انتخاب کنید!")
      }
      if (form[1].value == "sd") {
        return alert("لطفا یک واحد بزرگ را انتخاب کنید!")
      } 
        
      var data = {
        userID: form[0].value,
        leveloneID: form[1].value,
        title: form[2].value
      }

      services.AddPosition(data).then(res => {
        this.setState({updated: res.data})
      }).catch(e => console.log(e))
    }


    render() {

      const {users, ones, panel} = this.props
      const {updated} = this.state;
      
      return ( 
        <div className="col-md-4 ">
          <div className="card"> 
            <div className="p-3"> 
              <h5 className="font-weight-bold mb-3 irs">
                افزودن واحد داخلی (مدیر داخلی)
              </h5>
              <p className="mb-4 alert alert-primary font-small irs" >
                <MDBIcon icon="info" className="ml-2" /> {' '} 
                اینجا فردی که انتخاب میکنید به عنوان مدیر داخلی در نظر گرفته میشود. 
                سپس واحد داخلی در همان واحد بزرگی که انتخاب کنید و با عنوانی که میدهید ساخته میشود.
              </p>


              { 
              updated ? 
              <div className="alert alert-success irs m-3"> 
                  {updated.message} 
              </div> 
              : 
              null 
              }

              <form onSubmit={this.addPosition} className=" font-small irs">
                  
                {/* 1. userID */}
                <div className="my-3">  
                  انتخاب مدیر داخلی: 
                  <select name="userID" defaultValue="sd" className="irs mr-2">
                      <option value="sd" disabled key="1" className="irs">
                        انتخاب کنید
                      </option>
                    {
                      users.map((user, i) => 
                      <option value={user.id} key={i+2} className="irs">
                        {user.firstname} {user.lastname}
                      </option>)
                    }
                  </select>
                </div> 

                {/* 2. leveloneID */}
                <div className={`my-3 ${panel == "one" ? 'd-none' : null}`}>  
                  انتخاب واحد بزرگ: 
                  <select name="leveloneID" defaultValue={panel == "one" ? 'something' : "sd"} className="irs mr-2" onChange={this.getTwos}>
                      <option value="sd" disabled key="1" className="irs">
                        انتخاب کنید
                      </option>
                    {
                      ones.map((one, i) => (
                      <option value={one.id} key={i+2} className="irs">
                        {one.title}  
                      </option>
                      ))
                    }
                  </select>
                </div> 
                
                
                {/* 3. leveltwoID */}  
                <div className={`my-3`}>  
                  عنوان واحد داخلی: 
                  <input type="text" name="leveltwoID" className="irs mr-2" />
                </div> 

                <div className="my-3">  
                    <input type="submit" value="افزودن" className="btn btn-sm btn-primary irs" />
                </div>  

              </form> 

            </div>
          </div>
        </div>
      );
  }
}

export default AddTwoForm;