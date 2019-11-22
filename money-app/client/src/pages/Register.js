import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../store/actions/authAction'


class Register extends React.Component{
    state = {
        name : '',
        email : '',
        password : '',
        confirmPassword : '',
        error : {}
    }

    static getDerivedStateFromProps(nextProps,prevState){
        if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)){
            return{
                error : nextProps.auth.error
            }
        }
        return null
    }


    changeHandler = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submitHandler = (event) =>{
        event.preventDefault()
        let {name,email,password,confirmPassword} = this.state
        this.props.register({name,email,password,confirmPassword},this.props.history)
    }

    render(){
        let {name,email,password,confirmPassword,error} = this.state
        return(

            <div className= 'row'>
                <div className = 'col-md-6 offset-md-3'>
                    <h1 className= 'text-center display-4'>Register Here</h1>
                    <form onSubmit = {this.submitHandler}>

                        <div className="form-group">
                            <label htmlFor = 'name'> Name: </label>
                            <input
                                className = {error.name ? 'form-control is-invalid' : 'form-control'}
                                type = "text"
                                placeholder = "Enter Your Name Please"
                                name = "name"
                                id = "name"
                                value = {name}  
                                onChange = {this.changeHandler}  
                            />
                            {error.name && (<div className = 'invalid-feedback'>
                                {error.name}
                            </div>)}
                        </div>

                        <div className = "form-group">
                            <label htmlFor = 'email'> Email: </label>
                            <input
                                 className = {error.email ? 'form-control is-invalid' : 'form-control'}
                                type = "email"
                                placeholder = "Enter Your Email Please"
                                name = "email"
                                id = "email"
                                value = {email}  
                                onChange = {this.changeHandler}  
                            />
                           {error.email && (<div className = 'invalid-feedback'>
                                {error.email}
                            </div>)}
                        </div>

                        <div className = "form-group">
                            <label htmlFor = 'name'> Password: </label>
                            <input
                                 className = {error.password ? 'form-control is-invalid' : 'form-control'}
                                type = "password"
                                placeholder = "Enter Your Password Please"
                                name = "password"
                                id = "password"
                                value = {password}  
                                onChange = {this.changeHandler}  
                            />
                           {error.password && (<div className = 'invalid-feedback'>
                                {error.password}
                            </div>)}
                        </div>

                        <div className = "form-group">
                            <label htmlFor = 'name'> confirmPassword: </label>
                            <input
                                 className = {error.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                                type = "password"
                                placeholder = "Enter Your Name Please"
                                name = "confirmPassword"
                                id = "confirmPassword"
                                value = {confirmPassword}  
                                onChange = {this.changeHandler}  
                            />
                           {error.confirmPassword && (<div className = 'invalid-feedback'>
                                {error.confirmPassword}
                            </div>)}
                        </div>
                        <Link to= '/Login'><p>Already Have An Account? Login Here</p></Link>
                        <button className = "btn btn-primary d-block my-3">Register</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.auth
})

export default connect(mapStateToProps,{register})(Register)