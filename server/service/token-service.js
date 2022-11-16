const jwt = require('jsonwebtoken');
const Token = require('../models/Token');

class tokenService {

  generateFullTokens(id, email) {
    const accessToken = jwt.sign({id, email}, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
    const refreshToken = jwt.sign({id, email}, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
    return {
      accessToken,
      refreshToken
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({user: userId})
    if (tokenData) {
      tokenData.refreshToken = refreshToken
      await tokenData.save()
      return tokenData
    }
    const tokens = await Token.create({user: userId, refreshToken})
    return tokens
  }

  async removeToken(refreshToken) {
    const tokenData = await Token.findOneAndDelete({refreshToken})
    console.log('tokenData Remove', tokenData)
    return tokenData
  }

  async findToken(refreshToken) {
    const tokenData = await Token.findOne({refreshToken})
    return tokenData
  }

  validateAccessToken(token) {
    console.log("tokenValidate access 0", token)
    try {
        const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        console.log("userData access 1", userData)
      
        return userData
      } catch (error) {
        return null
    }
  }

  validateRefreshToken(token) {
    console.log("tokenValidate Refresh 0", token)
    try {
         const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
         console.log("userData refresh 1", userData)
         return userData
    } catch (error) {
      return null
    }
  }

}

module.exports = new tokenService()