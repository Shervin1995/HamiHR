import React, { Component } from "react";
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux"; 
import {sendOTP, sendMobile} from '../../Redux/actions' 
import Countdown from 'react-countdown'; 
    import {  
  MDBContainer, 
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,  
  MDBIcon
} from 'mdbreact'; 
import './Login.css'; 
// --------------------------------------
// 
// -------------------------------------- 

class OTP extends Component {
    constructor(props) {
      super(props);
      this.sendOTP = this.sendOTP.bind(this);
      this.onChangenum1 = this.onChangenum1.bind(this);
      this.onChangenum2 = this.onChangenum2.bind(this);
      this.onChangenum3 = this.onChangenum3.bind(this);
      this.onChangenum4 = this.onChangenum4.bind(this);
      this.nextkeyUp = this.nextkeyUp.bind(this);
      this.countDownFn = this.countDownFn.bind(this);
      this.resend = this.resend.bind(this);
      this.translate = this.translate.bind(this)

      this.state = {
        otp: {
          mobile: this.props.location.mobile
        }
      }

    }
    
  
    translate(message){
    
      if (message == undefined) return null;
      
      var payam; 
      if (message.includes('too many tries!')) {
        
        payam =  'تعداد دفعات رمز اشتباه بیش از حد مجاز است، تا 20 دقیقه دیگر نمیتوانید وارد شوید!';
        
      } else {

        switch (message) {  
          case 'Invalid OTP! Ckick on resend!':
            payam =  'اشتباه وارد کردید یکبار دیگر موبایل خود را وارد نمایید!';
          break;

          case 'You sent otp too late!':
            payam =  'خیلی دیر فرستادید، یکبار دیگر شماره موبایل خود را وارد نمایید!';
          break; 
            
          default: 
            payam =  message;
          break; 
        }

      }
  
      return (
        <div className="font-small my-2 irs">
          <div className="alert alert-warning text-right ">
            {payam}
          </div>
          <Link className="btn btn-primary" to="/"> وارد کردن موبایل</Link>
        </div>
      )
       
    }

    onChangenum1(e) {
      var num1 = e.target.value;
      this.setState((prevState) => ({
        ...prevState,
        otp: {
          ...prevState.otp,
          num1: num1
        }
      }));
    }
  
    onChangenum2(e) {
      var num1 = e.target.value;
      this.setState((prevState) => ({
        ...prevState,
        otp: {
          ...prevState.otp,
          num2: num1
        }
      }));
    }
  
    onChangenum3(e) {
      var num1 = e.target.value;
      this.setState((prevState) => ({
        ...prevState,
        otp: {
          ...prevState.otp,
          num3: num1
        }
      }));
    }
  
    onChangenum4(e) {
      var num = e.target.value;
      this.setState((prevState) => ({
        ...prevState,
        otp: {
          ...prevState.otp,
          num4: num
        }
      }));
    }
  
    sendOTP(){
      this.setState({updated: 'loading ...'});
      var data = this.state.otp
      
      this.props.sendOTP(data).then((res) => { 
        localStorage.setItem('psyAccessToken', res.token);  
        this.setState((prevState) => ({
          ...prevState,
          updated: res.message
        }));
      })
      .catch((e) => {
        console.log(e);
      });
    }
  
    nextkeyUp(e) {
      var target = e.srcElement || e.target;
      var maxLength = parseInt(target.attributes["maxlength"].value, 10);
      var myLength = target.value.length;
      if (myLength >= maxLength) {
          var next = target;
          while (next = next.nextElementSibling) {
              if (next == null)
                  break;
              if (next.tagName.toLowerCase() === "input") {
                  next.focus();
                  break;
              }
          }
      } 
    }

    resend(){  
      var mobile = this.state.mobile;
      this.props.sendMobile(mobile).then((res) => 
        this.setState({updated: res.message})
        ).catch((e) => console.log(e));
    }
     
    countDownFn({ minutes, seconds, completed }){

      if (completed) return (<a href="#" onClick={this.resend}> ارسال مجدد </a>);
      else return (
        <div>
          <span className="ml-3"> امکان ارسال مجدد بعد از: </span>
          {minutes}:{seconds}
        </div>
      );

    };
     
    render() {
      const { updated, otp} = this.state;
  
      if (updated === 'welcome') {
        return <Redirect to="/auth/profile" />;
      }
  
      return (
        <div className='d-flex justify-content-center align-items-center' id='login'>  
            <MDBContainer>
              <MDBRow>
                <MDBCol md='10' lg='6' xl='5' sm='12' className='mt-5 mx-auto'>
                  <MDBCard>
                    {
                      updated ?
                      <MDBCardBody>
                        {this.translate(updated)}
                      </MDBCardBody>
                      :
                      <MDBCardBody>
                        <div className='form-header morpheus-den-gradient irs pt-3'>  
                          <p className="text-right mb-0">
                            <MDBIcon icon='key' className='mt-2 mb-2 text-white' /> {' '}
                            یک عدد چهار رقمی به {otp.mobile} پیامک شده!
                          </p>
                          <div className="text-right">  
                            <Countdown 
                            date={Date.now() + 90000}
                            renderer={this.countDownFn}
                            overtime={true}
                            />
                          </div>
                          <hr/>
                          <p className="text-right font-small mb-0">
                            موبایل اشتباه وارد کردید؟  
                            <Link to='/'> بازگشت </Link>
                          </p>
                        </div> 

                        <div className="mt-3 text-center"> 
                          <div className="otp-form-psy"> 
                            <input type="number" max="9" maxLength="1" name="num1" onChange={this.onChangenum1} onKeyUp={this.nextkeyUp} />
                            <input type="number" max="9" maxLength="1" name="num2" onChange={this.onChangenum3} onKeyUp={this.nextkeyUp} />
                            <input type="number" max="9" maxLength="1" name="num3" onChange={this.onChangenum2} onKeyUp={this.nextkeyUp} />
                            <input type="number" max="9" maxLength="1" name="num4" onChange={this.onChangenum4} onKeyUp={this.nextkeyUp} />
                          </div>  
                        </div>  
                        <div className='text-center mt-3 black-text'>
                            <a href='#!' className="irs btn btn-primary w-100" onClick={this.sendOTP} >
                            تایید
                            </a>
                        </div>
                        
                      </MDBCardBody>
                    }
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>  
      </div> 
      );
    }
  }
  
  
  export default connect(null, { sendOTP, sendMobile })(OTP);