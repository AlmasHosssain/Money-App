const Transaction = require('../model/Transaction')
const User = require('../model/User')

module.exports = {
    
    create(req,res){

        let { amount, type, note } = req.body
        let userId = req.user._id;

        let transaction = new Transaction({
            amount,
            type,
            note,
            author : userId
        })

        transaction.save()
                    .then((trans)=>{

                        let updateUser = {...req.user._doc}
                        if (type == 'income') {
                            updateUser.balance = updateUser.balance + amount
                            updateUser.income = updateUser.income + amount
                        }else if(type == 'expense'){
                            updateUser.balance = updateUser.balance - amount
                            updateUser.expense = updateUser.expense + amount
                        }

                        updateUser.transactions.unshift(trans._id)
                        User.findByIdAndUpdate(updateUser._id,{$set : updateUser },{new : true})
                        .then((result)=>{
                            res.status(201).json({
                                message : "Transaction Created Successfully..",
                                ...trans._doc,
                                user : result
                            })
                        })
                        .catch((error)=>{
                            res.status(200).json({
                                message : "Some Error Occurred",
                                error
                            })
                        })
                        
                    })
                    .catch((error)=>{
                        res.status(500).json({
                            message : "Server Error Occurred..",
                            error
                        })
                    })
    },

    getAll(req,res){

        let {_id} = req.user
        Transaction.find({author : _id})
                    .then((transactions)=>{
                        if (transactions.length == 0) {
                            res.status(200).json({
                                message : "No transaction found..."
                            })
                        }else{
                            res.status(200).json(transactions)
                        }
                    })
                    .catch((error)=>{
                        res.status(500).json({
                            message : "Server Error Occurred..",
                            error
                        })
                    })
    },

    getSingleTransaction(req,res){
        let { transactionId } = req.params
        Transaction.findById(transactionId)
                    .then((transaction)=>{
                        if (!transaction) {
                            res.status(200).json({
                                message : "No Single Transaction Is Found.."
                            })
                        }else if(transaction){
                            res.status(200).json(transaction)
                        }
                    })
                    .catch((error)=>{
                        res.status(500).json({
                            message : "Server Error Occurred..",
                            error
                        })
                    })
    },

    update(req,res){
        let { transactionId } = req.params
        Transaction.findOneAndUpdate({_id : transactionId},{$set : req.body},{new : true})
                    .then((result)=>{
                        res.status(200).json({
                            message : "Transaction Updated Successfully..",
                            transaction : result
                        })
                    })
                    .catch((error)=>{
                        res.status(500).json({
                            message : "Server Error Occurred..",
                            error
                        })
                    })
    },

    remove (req,res){
        let {transactionId} = req.params
        Transaction.findOneAndDelete({_id : transactionId})
                    .then((result)=>{
                        res.status(200).json({
                            message : "Transaction Removed",
                            ...result._doc
                        })
                    })
                    .catch((error)=>{
                        res.status(500).json({
                            message : "Server Error Occurred..",
                            error
                        })
                    })
    }
}