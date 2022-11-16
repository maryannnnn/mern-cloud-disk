import validator from 'validator'

export const validFormReg = ({ ...form }, setErrorEmail,
  setErrorPassword, setErrorName, setErrorPasswordConfirm) => {
  
   if (validator.isLength(form.name, {min: 3, max: 12})) {
    setErrorName('')
  } else {
    setErrorName('Name must be longer than 3 and shorter than 16')
  }

  if (validator.isEmail(form.email)) {
    setErrorEmail('')
  } else {
    setErrorEmail('Enter valid Email!')
  }
  
  if (validator.isStrongPassword(form.password, {
    minLength: 8, minLowercase: 1,
    minUppercase: 1, minNumbers: 1, minSymbols: 1
  })) {
    setErrorPassword('')
  } else {
    setErrorPassword('Is Not Strong Password')
  }

  if (form.password === form.passwordConfirm) {
    setErrorPasswordConfirm('')
  } else {
    setErrorPasswordConfirm('Passwords do not match')
  }
}

export const validFormLogin = ({ ...form }, setErrorEmail, setErrorPassword) => {

  if (validator.isEmail(form.email)) {
    setErrorEmail('')
  } else {
    setErrorEmail('Enter valid Email!')
  }

  if (validator.isStrongPassword(form.password, {
    minLength: 8, minLowercase: 1,
    minUppercase: 1, minNumbers: 1, minSymbols: 1
  })) {
    setErrorPassword('')
  } else {
    setErrorPassword('Is Not Strong Password')
  }

}
