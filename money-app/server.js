const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')



const app = express();

app.use(morgan('dev'))
app.use(cors())

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use(passport.initialize())
require('./passport')(passport)


app.use('/api/users',require('./routers/userRoute'))
app.use('/api/transactions',require('./routers/transactionRoute'))

app.get('/',(req,res)=>{
    res.json({
        message : "Welcome in my FullStack Project"
    })
})


const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`Server is running on the port ${PORT}`);
    mongoose.connect('mongodb://localhost/money-app',
    {useNewUrlParser : true},
    ()=>{
        console.log(`Database is connected Successfully...`);
        
    }
    )
})