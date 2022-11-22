const File = require("../models/File")
const fs = require('fs')
const {createDir} = require('../service/file-service')

class fileController {

  async createDir(req, res) {
    const {name, type, parent} = req.body
    const user = req.user.id
    const file = new File({name, type, parent, user})
    console.log("new File", file)
    const parentFile = await File.findById(parent)
    console.log("new File parentFile", parentFile)
    if(!parentFile) {
      file.path = name
      await createDir(file) 
    } else {
      file.path = `${parentFile.path}\\${file.name}`
      await createDir(file)
      parentFile.childs.push(file._id)
      await parentFile.save()
    }
    console.log("new File Save", file)
    await file.save()
    return res.json(file)
  }
}

module.exports = new fileController()