
 
export const VALIDATION_REG = '[
       heck('name', 'Name must be longer than 3 and shorter than 20').isLength({min:3, max:20}), 
       check('email', "Uncorrect email").not().isEmpty().isEmail().normalizeEmail(),
       check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12}),
       check('passwordConfirm', 'Passwords do not match').custom((value, {req}) => (value === req.body.password))
    ]'

 export const VALIDATION_LOGIN = '[
       check('email', "Uncorrect email").not().isEmpty().isEmail().normalizeEmail(),
       check('password', 'Password must be longer than 3 and shorter than 12').isLength({min:3, max:12}),

    ]'


