const User = require('../model/user.model')

const findEmail = (data)=>{
    return User.findOne(data)
}

const createEntry = (data)=>{
    return User.create(data)
}

module.exports = {findEmail,createEntry}