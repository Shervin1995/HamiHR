import { MDBIcon } from "mdbreact";
import React, { Component } from "react"; 
import services from "../../Axios"

// --------------------------------------------------------
// SpecialPsychologist
// --------------------------------------------------------
class AddThreeForm extends Component {
    constructor(props) {
      super(props);    
      this.state =  {
        twos: [],
        updated: null
      }
      this.getTwos = this.getTwos.bind(this)
      this.addPosition = this.addPosition.bind(this)
    }  

    getTwos(e){ 
      var leveloneID = e.target.value;
      services.getTwos(leveloneID).then(res => {
        this.setState({twos: res.data})
      }).catch(e => console.log(e));
    }

    addPosition(e){
      e.preventDefault();
      var form = e.target

      if (form[0].value == "sd") {
        return alert("لطفا یک کاربر را انتخاب کنید!")
      }
      if (form[1].value == "sd") {
        return alert("لطفا یک واحد بزرگ را انتخاب کنید!")
      }
      if (form[2].value == "sd") {
        return alert("لطفا یک واحد داخلی را انتخاب کنید!")
      }
        
      var data = {
        userID: form[0].value,
        leveloneID: form[1].value,
        leveltwoID: form[2].value
      }

      services.AddPosition(data).then(res => {
        this.setState({updated: res.data})
      }).catch(e => console.log(e))
    }


    render() {

      const {users, ones, panel} = this.props
      const {twos, updated} = this.state;
      
      return ( 
        <div className="col-md-4 ">
          <div className="card"> 
            <div className="p-3"> 
              <h5 className="font-weight-bold mb-3 irs">
                افزودن کارشناس
              </h5>
              <p className="mb-4 alert alert-primary font-small irs" >
                <MDBIcon icon="info" className="ml-2" /> {' '} 
                کاربر مدنظر خود را انتخاب کنید
                سپس واحد بزرگ 
                سپس واحد داخلی 
                را انتخاب کنید.
                دکمه افزودن را بزنید!
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
                  انتخاب کاربر: 
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
                <div className={`my-3 ${panel == "two" || panel == "one" ? 'd-none' : null}`} >  
                  انتخاب واحد بزرگ: 
                  <select name="leveloneID" 
                  defaultValue={panel == "two" || panel == "one" ? 'something' : "sd"} 
                  className="irs mr-2" 
                  onChange={this.getTwos}
                  >
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
                <div className={`my-3 ${panel == "two" ? 'd-none' : null}`}>  
                  انتخاب واحد داخلی: 
                  <select name="leveltwoID" 
                  defaultValue={panel == "two" ? 'something' : "sd"} 
                  className="irs mr-2"
                  >
                      <option value="sd" disabled key="1" className="irs">
                        انتخاب کنید
                      </option>
                    {
                      twos.map((two, i) => ( 
                      <option value={two.id} key={i+2} className="irs">
                        {two.title}  
                      </option>
                      ))
                    }
                  </select>
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

export default AddThreeForm;