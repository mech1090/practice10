const bcrypt = require('bcrypt')
const config = require('config')
const userService = require('../service/user.service')


const getLoginForm = (req,res)=>{
    return res.render('login/layout')
}

const login = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const findUser = await userService.findEmail({email})
    if(!findUser){
        
        return res.render('signup/layout',{message:`${email} does not exists `})
    }
    const matchPassword = await bcrypt.compare(password,findUser.password)
    if(!matchPassword){
        return res.render('login/layout',{message:'Credentials Mismatached'})
    }
    return res.render('user/layout')
}


const getSignupForm = (req,res)=>{
    return res.render('signup/layout')
}

const signup = async(req,res)=>{
    const {email,password} = req.body
    const fields = {email,password}
    const hashPassword = await bcrypt.hash(password,config.get('hash.salt'))
    const findUser = await userService.findEmail({email})
    if(findUser){
        return res.render('login/layout',{message:'Email already exist Login'})
    }
    const createUser = await userService.createEntry({email,password:hashPassword})
    return res.render('signup/layout',{message:`${createUser.email} Created`})
}

const getAll = async(req,res)=>{
    const {email,password} = req.body
    const allUser = await userService.findUser({email})
    return res.send(allUser)
}




module.exports = {getLoginForm,login,getSignupForm,signup,getAll}