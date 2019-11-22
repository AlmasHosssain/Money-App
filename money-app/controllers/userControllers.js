const registerValidator = require('../validator/registerValidator')
const loginValidator = require('../validator/loginValidator')
const bcrypt = require('bcrypt')
const User = require('../model/User')
const jwt = require('jsonwebtoken')

module.exports = {
    login(req,res){
        let {email,password} = req.body
        let validate = loginValidator({email,password})

        if (!validate.isValid) {
            res.status(400).json(validate.error)
        }else{
            User.findOne({email})
                .then((user)=>{
                    if (!user) {
                        return res.status(400).json({
                            message : "User Not Found..."
                        })
                    }

                    bcrypt.compare(password, user.password, (err,result)=>{
                        if (err) {
                            return res.status(400).json({
                                message : "Error Occurred",
                                err
                            })
                        }
                        if (!result) {
                            return res.status(400).json({
                                message : "Password Does Not Matched"
                            })
                        }

                        let token = jwt.sign({
                            _id : user._id,
                            name : user.name,
                            email : user.email,
                            amount : user.amount,
                            income : user.income,
                            expense : user.expense,
                            transactions : user.transactions 
                        },'SECRET',{expiresIn : '3h'})

                        res.status(200).json({
                            message : "Login Successfully...",
                            token : `Bearer ${token}`
                        })
                    })
                })
                .catch((error)=>{
                    res.json(500).json({
                        message : "Server Error Occurred....",
                        error
                    })
                })
        }
    },

    register(req,res){
        let {name,email,password,confirmPassword} = req.body
        let validate = registerValidator({name,email,password,confirmPassword})
        
        if (!validate.isValid) {
            res.status(400).json(validate.error)
        } else {
            User.findOne({email})
                .then((user)=>{

                    if (user) {
                        return res.status(400).json({
                            message : "Email Already Exist.Please Enter A New Email.."
                        })
                    }

                    bcrypt.hash(password, 12, (err,hash)=>{
                        if (err) {
                            return res.status(400).json({
                                message : "Server Error Occurred.."
                            })
                        }

                        let user = new User({
                            name,
                            email,
                            password : hash,
                            balance : 0,
                            expense : 0,
                            income : 0,
                            transactions : []
                        })

                        user.save()
                            .then((user)=>{
                                res.status(201).json({
                                    message : "User Created Successfully.",
                                    user
                                })
                            })
                            .catch((error)=>{
                                res.status(500).json({
                                    message : "Server Error Occurred",
                                    error
                                })
                            })
                    })
                })
                .catch((error)=>{
                    res.status(500).json({
                        message : "Server Error Occurred",
                        error
                    })
                })          
        }
    },

    allUser(req,res){
        User.find()
            .then((users)=>{
                if (!users) {
                    return res.status(200).json({
                        message : "No User Found..."
                    })
                }else{
                    res.status(200).json(users)
                }
            })
            .catch((error)=>{
                res.json({
                    message : "Error Occurred bro!...",
                    error
                })
            })
    }
}