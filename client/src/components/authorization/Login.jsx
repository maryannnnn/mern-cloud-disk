import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../utils/input/Input'
import { login, loginWithSocial } from '../../actions/authActions'
import './authorization.css'
import { MessageBox, LoadingBox } from '../../utils/boxes/boxes'
import { validFormLogin } from '../../utils/validators'
import { auth, providerGoogle, providerFacebook, providerGithub } from "../../firebase"
import { signInWithPopup } from "firebase/auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons'

const Login = ({history}) => {

  const authLoginR = useSelector((state) => state.authLoginR)
  const { currentUser, loading, error } = authLoginR

  const [form, setForm] = useState({email: '', password: ''})
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [formValid, setFormValid] = useState(false)
  
  const dispatch = useDispatch()

  const changeHandler = (e) => {
    validFormLogin({ ...form, [e.target.name]: e.target.value }, setErrorEmail, setErrorPassword)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitHandlerLogin = (e) => {
    e.preventDefault()
    dispatch( login( {...form} ) )
  }

  const submitHandlerLoginGoogle = (e) => {
    e.preventDefault()
    try {
      signInWithPopup(auth, providerGoogle).then((result) => {
        dispatch(loginWithSocial(result))
      })
    } catch (error) {
      console.log(error, "error Login With Google")
      console.log(error.message, "error Login With Google Message")
    }
  }

  const submitHandlerLoginFacebook = (e) => {
    e.preventDefault()
    try {
      signInWithPopup(auth, providerFacebook).then((result) => {
        console.log(result, "resultFacebook")
        dispatch(loginWithSocial(result))
      })
    } catch (error) {
      console.log(error, "error Login With Facebook")
      console.log(error.message, "error Login With Facebook Message")
    }
  }

  const submitHandlerLoginGithub = (e) => {
    e.preventDefault()
    try {
      signInWithPopup(auth, providerGithub).then((result) => {
        console.log(result, "resultGithub")
        dispatch(loginWithSocial(result))
      })
    } catch (error) {
      console.log(error, "error Login With Github")
      console.log(error.message, "error Login With FGithub Message")
    }
  }
  
  useEffect(() => {
    if (errorEmail || errorPassword) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
  }, [errorEmail, errorPassword])

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (currentUser) history.push("/");
    }
  }, [currentUser, history])
 
  return (
    <form className='authorization' onSubmit={submitHandlerLogin}>
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="errorVariant">{error}</MessageBox>}
      <div className="authorization__header">Authorization</div>
      <h4>Login</h4>
      {errorEmail && <h5>{errorEmail}</h5>}
      <Input type="text" name="email" value={form.email} onChange={changeHandler} placeholder="Input email..." />
      <h4>Password</h4>
      {errorPassword && <h5>{errorPassword}</h5>}
      <Input type="password" name="password" value={form.password} onChange={changeHandler} placeholder="Input password..." />
      <button className='authorization__btn' disabled={!formValid} >Sign-in</button>
      <div>or you can sign in with</div>
      <div className='authorization__btn_social_all'>
      <button className='authorization__btn_social' onClick={submitHandlerLoginGoogle} ><FontAwesomeIcon icon={faGoogle} /></button>
      <button className='authorization__btn_social' onClick={submitHandlerLoginFacebook} ><FontAwesomeIcon icon={faFacebookF} /></button>
      <button className='authorization__btn_social' onClick={submitHandlerLoginGithub} ><FontAwesomeIcon icon={faGithub} /></button>
      </div>
    </form>
  )
}

export default Login