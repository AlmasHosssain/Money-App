const validator = require('validator')

const validate = (user) =>{
    let error = {}
    
    if (!user.email) {
        error.email = "Please Enter Your Email First.."
    } else if(!validator.isEmail(user.email)) {
        error.email = "Please Enter The Correct Email Please..."
    }

    if (!user.password) {
        error.password = "Please Enter The Password First...."
    }else if(user.password.length < 6){
        error.password = "Password Is Too Small.Please Enter the Correct Password.."
    }

   
    return{
        error,
        isValid : Object.keys(error).length == 0
    }
}
module.exports = validate