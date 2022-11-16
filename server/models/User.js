const { Schema, model, ObjectId } = require("mongoose")

const User = new Schema({
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "USER"},
    diskSpace: {type: Number, default: 1024**3*10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    files : [{type: ObjectId, ref:'File'}],
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = model('User', User)