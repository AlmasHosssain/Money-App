const validator = require('validator')

const validate = (user) =>{
    let error = {}
    
    if(!user.name){
        error.name = "Please Enter Your Name Please"
    }

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

    if (!user.confirmPassword) {
        error.confirmPassword = "Please Enter The Confirm Password First...."
    }else if(user.password != user.confirmPassword){
        error.confirmPassword = "Password Is Not Matched.Please Enter The Correct Password..."
    }

    return{
        error,
        isValid : Object.keys(error).length == 0
    }
}
module.exports = validate