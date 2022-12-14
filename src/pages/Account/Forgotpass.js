import React, { useRef, useState, useContext, } from 'react'
import styles from './signup.module.css'
import { Link } from 'react-router-dom'
import { CognitoUser } from 'amazon-cognito-identity-js';
import UserPool from '../../UserPool';


const Forgotpass = (props) => {
  const [LinkSent, setLinkSent] = useState(false)
  const [ResetData, setResetData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword:""
  } )
  const resetMsg = useRef()
  const change = (event) => {
    setResetData(prevData => {
      return {
          ...prevData,
          [event.target.name]: event.target.value
      }
  })
  }

const getUser = () => {
  return new CognitoUser({
    Username: ResetData.email.toLowerCase(),
    Pool: UserPool
  })
}


  const sendCode = (e) => {
  e.preventDefault(); 

  getUser().forgotPassword({
    onSuccess : data => {
      console.log('onsuccess', data)
    },
    onFailure : err => {
      console.log('onsuccess', err)
    },
    inputVerificationCode: data => {
      console.log('Input code', data);
      setLinkSent(true)
    }
  })
  }
  const ResetPassword = (e) => {
  e.preventDefault(); 

  getUser().confirmPassword(ResetData.code, ResetData.password,{
    onSuccess : data => {
      console.log('onsuccess', data)
    },
    onFailure : err => {
      console.log('onsuccess', err)
    },
  })
  }


  
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <div className={styles['forgot-box']}>
            <p className={styles['reset-link-msg']} ref={resetMsg}>A reset link has been sent to your email address </p>
            <h1>Enter your E-mail address to reset password</h1>
              {
                !LinkSent ? (
                  <form action="" onSubmit={sendCode}>
                  <input 
                     type="text"
                     placeholder='E-mail'
                     onChange={change}
                     name="email"
                     value={ResetData.email}
                     className={styles['forgot-mail']}
                              /> <br />
                  <input type="submit" placeholder='Send Verification Code' className={styles['forgot-btn']}/>
                  </form>
                ) : (
                  <form action="" onSubmit={ResetPassword}>
                  <input 
                     type="text"
                     placeholder='OTP'
                     onChange={change}
                     name="code"
                     value={ResetData.code}
                     className={styles['forgot-mail']}
                              /> 
                  <input 
                     type="text"
                     placeholder='New Password'
                     onChange={change}
                     name="password"
                     value={ResetData.password}
                     className={styles['forgot-mail']}
                              /> 
                  <input 
                     type="text"
                     placeholder='Confirm Password'
                     onChange={change}
                     name="confirmPassword"
                     value={ResetData.confirmPassword}
                     className={styles['forgot-mail']}
                              /> 
                              <br />
                  <input type="submit" placeholder='Change Password' className={styles['forgot-btn']}/>
                  </form>
                )
              }


          <Link to={'/'} className={styles['b-t-lp']}>back to <span>Login</span></Link>
        </div>
      </div>
    </div>
  )
}

export default Forgotpass
