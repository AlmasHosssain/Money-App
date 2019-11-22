const mongoose = require('mongoose')
const Schema =mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        trim : true,
        required : true
    },
    email: {
        type : String,
        trim : true,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    balance: Number,
    income : Number,
    expense : Number,
    transactions : {
        type : [{
            type : Schema.Types.ObjectId,
            ref : 'Transaction'
        }]
    }
})

const User = mongoose.model('User',userSchema)
module.exports = User