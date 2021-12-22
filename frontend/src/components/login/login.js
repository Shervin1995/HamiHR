
import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux"; 
import {sendMobile} from '../../Redux/actions'
 
import {  
  MDBContainer, 
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody, 
  MDBInput,
  MDBIcon
} from 'mdbreact';
import './Login.css'; 


// 
class Login extends Component {
   
  constructor(props) {
    super(props);
    this.sendMobile = this.sendMobile.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.checkToken = this.checkToken.bind(this)
    this.translate = this.translate.bind(this)

    this.state = {  
      updated: false
    };

  }

  componentDidMount(){
    this.checkToken()
  } 

  checkToken(){ 
    var token = localStorage.getItem('psyAccessToken'); 
    if (token && token !== 'undefined' ){
      this.props.history.push('/auth/profile')  
    } 
  }

  onChangeUsername(e) {
    this.setState({
      mobile: e.target.value,
    });
  }

  translate(message){
    
    if (message == undefined) return null;

    var payam; 
    if (message.includes('Get back in')) {
      
      payam =  'لطفا چند دقیقه بعد دوباره امتحان کنید!'

    } else {

      switch (message) {  
        case 'Already sent to this number!':
          payam =  'حداقل 90 ثانیه فاصله بین دو ارسال وجود دارد!';
        break; 
        
        case 'Mobile invalid characters!':
          payam =  'موبایل اشتباه است!';
        break; 
        
        default: 
          payam =  message;
        break; 
      }

    }

    return (
      <div className="alert alert-warning irs text-right font-small my-2">
        {payam}
      </div>
    )
     
  }

  
  sendMobile(event){
    event.preventDefault(); 
    // show loading ...
    this.setState({updated: true}); 
    // get mobile
    var mobile = event.target[0].value;
    // send to API
    this.props.sendMobile(mobile)
    .then(res => this.setState({updated: res}))
    .catch(e => console.log(e));
  }

  toggleCollapse(collapseID){
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));
  }

  render() {
    const { updated } = this.state;

    if (updated.message === 'Sent to your phone!') {
      return <Redirect to={{
        pathname: '/otp',
        mobile: updated.mobile
    }} />;
    }

    return (
      <div className='d-flex justify-content-center align-items-center' id='login'>  
       
            <MDBContainer>
              <MDBRow>
                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    <MDBCardBody>
                      { 
                      updated === true ?
                      
                      <div className="text-right irs">
                        <h5 className="font-weight-bold"> لطفا صبر کنید ... </h5>
                        <p className="mb-0">اگر زیاد طول کشید صفحه را رفرش کنید !</p>
                        <p>به اینترنت وصل هستید؟</p>
                      </div>
                      :
                      <form onSubmit={this.sendMobile} >
                        
                      <div className='form-header blue-gradient irs pt-3' style={{direction:'rtl'}}>
                        <h3 className="font-weight-bold">
                           منابع انسانی حامیکت
                        </h3>
                        <p className="mb-0"> 
                          برای ورود کافیست موبایل خود را وارد نمایید!
                        </p>
                        {this.translate(updated.message)} 
                      </div>  

                      <div className="d-flex justify-content-center">
                        <input type="text" name="mobile" required 
                          style={{fontSize: "30px"}}
                          className="text-center"
                          pattern="[0-9]{11}"
                          placeholder="09125555123"
                        />
                      </div>  

                      <div className='text-center mt-3 '>
                        <input className="irs btn btn-primary w-100" type="submit" value="مرحله بعدی" /> 
                      </div>
                        
                      </form>

                      }
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>  
      </div>
    );
  }
}

//
export default connect(null, {sendMobile })(Login);

