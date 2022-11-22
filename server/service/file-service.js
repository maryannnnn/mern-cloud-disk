const fs = require('fs')

exports.createDir =  (file) => {
  console.log("new File createDir", file)
  const filePath = `${process.env.FILE_PATH}\\${file.user}\\${file.path}`
   console.log("new File filePath", filePath)
   return new Promise((resolve, reject) => {
    try {
      if(!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath)
        return resolve({message: 'File was created'})
      } else {
        console.log("new File No")
        return reject({message: "File already exist"})
      }
    } catch(e) {
        console.log("new File No")
        return reject({message: 'File error'})  
    }
  })
}