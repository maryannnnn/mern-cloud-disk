const {check, validationResult} = require("express-validator")
const generator = require("generate-password")

exports.validationAuth = (req) => {
      const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        return ` Error: ${msg}`
      };
      return validationResult(req).formatWith(errorFormatter)
}

exports.validationReg = () => {
  return [
       check('name', 'Name must be longer than 3 and shorter than 16').isLength({min:3, max:16}), 
       check('email', "Uncorrect email").not().isEmpty().isEmail().normalizeEmail(),
       check('password', 'Password must be longer than 3 and shorter than 16').isLength({min:8, max:16}),
       check('passwordConfirm', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
  ]
}

exports.validationLogin = () => {
  return [
       check('email', "Uncorrect email").not().isEmpty().isEmail().normalizeEmail(),
       check('password', 'Password must be longer than 8 and shorter than 16').isLength({min:8, max:16})
  ]
}

exports.generatorPasswordStrong = () => {

  const password = generator.generate({
    length: 12,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true
  });
  return password
}