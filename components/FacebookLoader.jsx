import { style, width } from "@material-ui/system";
import axios from "axios";
import React,{Component} from "react";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import LandingPage from "../pages/LandingPage";
import styles from "../styles/button.module.scss";

export default class Facebook extends Component {
  state ={
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
    cookie:false,
    accessToken:''
  }
  
  responseFacebook = response => {
    console.log(response)

    this.setState({
      isLoggedIn: true,
      userID:response.userID,
      name:response.name,
      email:response.email,
      picture:response.picture,
      accessToken: response.accessToken,
    })
    let token = this.state.accessToken;
    console.log(token);
    // axios.defaults.headers.common['Ahthorization'] = `Bearer ${token}`
    document.cookie = `token=${token}`
    console.log(document.cookie);
  }
  componentClicked = () => console.log('clicked');

  render() {
    let fbContent;
   
    if(this.state.isLoggedIn) {
      fbContent = (
      <div style={{width:'400px', margin: 'auto', background:'green', padding:'20px'}}>
      <h2>Welcome {this.state.name}</h2>
      Email : {this.state.email}
      </div>
      );
    }else {
      
    }
    return(
      <div className= {styles.facebook}>
        <FacebookLogin
          appId="248399230008338"
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.componentClicked}
          cookie={true}
          callback={this.responseFacebook} 
          render={renderProps=>(
            <div className={styles.facebook}>
              <button className={styles.facebookText}onClick={renderProps.onClick}>Facebook으로 로그인</button>
            </div>)}
        />
    </div>
  )
}
}