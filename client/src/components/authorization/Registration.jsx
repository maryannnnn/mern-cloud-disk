import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../../utils/input/Input'
import { registration } from '../../actions/authActions'
import './authorization.css'
import { MessageBox, LoadingBox } from '../../utils/boxes/boxes'
import { validFormReg } from '../../utils/validators'

const Registration = () => {

  const authRegisterR = useSelector((state) => state.authRegisterR)
  const { currentUser, loading, error } = authRegisterR
  
  const dispatch = useDispatch()

  const [form, setForm] = useState({name: '', email: '', password: '', passwordConfirm: ''})
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')
  const [errorPasswordConfirm, setErrorPasswordConfirm] = useState('')
  const [formValid, setFormValid] = useState(false)
  

  const changeHandler = (e) => {
    validFormReg({ ...form, [e.target.name]: e.target.value }, setErrorEmail,
      setErrorPassword, setErrorName, setErrorPasswordConfirm)
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submitHandlerRegistration = (e) => {
    e.preventDefault()
    dispatch(registration( {...form} ))
  }

  useEffect(() => {
    if (errorName || errorEmail || errorPassword || errorPasswordConfirm) {
      setFormValid(false)
    } else {
      setFormValid(true)
    }
}, [errorName, errorEmail, errorPassword, errorPasswordConfirm])

  return(
    <form className='authorization' >
      {loading && <LoadingBox></LoadingBox>}
      {error && <MessageBox variant="errorVariant">{error}</MessageBox>}
      <div className="authorization__header">Registration</div>
      <h4>Name</h4>
      {errorName && <h5>{errorName}</h5>}
      <Input type="text" name="name" value={form.name} onChange={changeHandler} placeholder="Input name..." />
      <h4>Email</h4>
      {errorEmail && <h5>{errorEmail}</h5>}
      <Input type="text" name="email" value={form.email} onChange={changeHandler} placeholder="Input email..." />
      <h4>Password</h4>
      {errorPassword && <h5>{errorPassword}</h5>}
      <Input type="password" name="password" value={form.password} onChange={changeHandler} placeholder="Input password..." />
      <h4>Confirm password</h4>
      {errorPasswordConfirm && <h5>{errorPasswordConfirm}</h5>}
      <Input type="password" name="passwordConfirm" value={form.passwordConfirm} onChange={changeHandler} placeholder="Input password confirm..." />
      <button 
        className='authorization__btn'
        type='submit'
        disabled={!formValid}
        onClick={submitHandlerRegistration} >
        Registration
        </button>
    </form>
  )
}

export default Registration