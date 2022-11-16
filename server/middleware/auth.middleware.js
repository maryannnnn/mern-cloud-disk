const tokenService = require('../service/token-service')
//const config = require('config')

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(res.status(400).json({ message: "User not authorized" }))
    }

    const accessToken = authorizationHeader.split(' ')[1];
    console.log("accessToken Middleware", accessToken)
    if (!accessToken) {
      return next(res.status(400).json({ message: "Incorrect AccessToken 1" }))
    }

    const userData = tokenService.validateAccessToken(accessToken)
    console.log("userData 2 Middleware", userData)
    if (!userData) {
      return next(res.status(400).json({ message: "Incorrect AccessToken 2" }))
    }

    req.user = userData;
      next()

  } catch (error) {
    return next(res.status(400).json({ message: "User not authorized, error " }))
  }
}






