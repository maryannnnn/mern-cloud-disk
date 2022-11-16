const User = require("../models/User")

class userController {

   async getUsers(req, res, next) {
     const users = await User.find()
     return res.json(users)
   }

}

module.exports = new userController()