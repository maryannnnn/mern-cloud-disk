const User = require("../models/User")
const bcrypt = require("bcrypt")
const uuid = require('uuid')
const {sendActivationMail} = require('../service/mail-service')
const {validationAuth, generatorPasswordStrong } = require('../service/user-service')
const tokenService = require("../service/token-service")


class authController {

  async registration(req, res, next) {

      const result = validationAuth(req)

      if (!result.isEmpty()) {
        return next(res.status(400).json({ message: result.array(), errors: result.array() }))
      }

      const candidateName = await User.findOne({ name: req.body.name })
      if(candidateName) {
        return next(res.status(400).json({ message: "User with Name already exist" })) 
      }

      const candidateEmail = await User.findOne({ email: req.body.email })
      if(candidateEmail) {
        return next(res.status(400).json({ message: "User with Email already exist" })) 
      }

      const activationLink = uuid.v4() // v34fa-asfasf-142saf-sa-asf
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        activationLink
    })
        
        sendActivationMail(user.email, `${process.env.API_URL}/api/auth/activate/${activationLink}`)
        await user.save()
        const tokens = tokenService.generateFullTokens(user._id, user.email)
        await tokenService.saveToken(user._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.json({
          ...tokens,
          user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          diskSpace: user.diskSpace,
          usedSpace: user.usedSpace,
          avatar: user.avatar,
          activationLink: user.activationLink
                }
       })
  }

  async login(req, res, next) {

      const result = validationAuth(req)

      if (!result.isEmpty()) {
        return next(res.status(400).json({ message: result.array(), errors: result.array() }))
      }

      const {email, password} = req.body
      const user = await User.findOne({ email })
      if(!user) {
        return next(res.status(400).json({ message: "User not found" })) 
      }
      const isPassValid = bcrypt.compareSync(password, user.password)
      if (!isPassValid) {
        return next(res.status(400).json({ message: "Invalid password" })) 
      }
        const tokens = tokenService.generateFullTokens(user._id, user.email)
        await tokenService.saveToken(user._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
          return res.json({
            ...tokens,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              diskSpace: user.diskSpace,
              usedSpace: user.usedSpace,
              avatar: user.avatar,
              activationLink: user.activationLink
            }
          })
  }

  async soclogin(req, res, next) {

      const { email } = req.body
      const user = await User.findOne({ email })
        if(user) {
        const tokens = tokenService.generateFullTokens(user._id, user.email)
        await tokenService.saveToken(user._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
          return res.json({
            ...tokens,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              diskSpace: user.diskSpace,
              usedSpace: user.usedSpace,
              avatar: user.avatar,
              activationLink: user.activationLink
            }
          })
      } else {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(generatorPasswordStrong(), 12)
        })
        await user.save()
        const userNew = await User.findOne({ email })
         if(!userNew) {
          return next(res.status(400).json({ message: "UserNew not found" })) 
         }
        const tokens = tokenService.generateFullTokens(user._id, user.email)
        await tokenService.saveToken(user._id, tokens.refreshToken)
        res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
          return res.json({
            ...tokens,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              diskSpace: user.diskSpace,
              usedSpace: user.usedSpace,
              avatar: user.avatar,
              activationLink: user.activationLink
            }
          })
      }
   }

   async activate(req, res, next) {

   const activationLink = req.params.link
   console.log("activationLink", activationLink)
   const user = await User.findOne({activationLink})
    if (user) {
      if (user.isActivated === true) {
        return next(res.status(400).json({ message: "Link already activated" }))  
      }
      user.isActivated = true
      await user.save()
      return res.redirect(process.env.CLIENT_URL)
    } else {
      return next(res.status(400).json({ message: "Incorrect activation link" })) 
    }
   }

   async refresh(req, res, next) {
      const {refreshToken} = req.cookies
      console.log("refreshToken 0", refreshToken)
      if(!refreshToken) {
        return next(res.status(400).json({ message: "Incorrect RefreshToken 1" })) 
      }
      const userData = tokenService.validateRefreshToken(refreshToken)
      console.log("userData Validate RefreshToken 2", refreshToken)
      if (!userData) {
        return next(res.status(400).json({ message: "Incorrect validate RefreshToken 2" })) 
      }
      const tokenFromDb = await tokenService.findToken(refreshToken)
      console.log("tokenFromDb RefreshToken 3", tokenFromDb)
      if (!tokenFromDb) {
        return next(res.status(400).json({ message: "Incorrect FromDb RefreshToken 3" })) 
      }

      const user = await User.findById(userData.id)
      const tokens = tokenService.generateFullTokens(user._id, user.email)
      await tokenService.saveToken(user._id, tokens.refreshToken)
      res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
          return res.json({
            ...tokens,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role,
              diskSpace: user.diskSpace,
              usedSpace: user.usedSpace,
              avatar: user.avatar,
              activationLink: user.activationLink
            }
          })
   }

   async logout(req, res, next) {

      const {refreshToken} = req.cookies
      const tokenController = await tokenService.removeToken(refreshToken)
      res.clearCookie('refreshToken')
      return res.json(tokenController)
   }

}

module.exports = new authController()