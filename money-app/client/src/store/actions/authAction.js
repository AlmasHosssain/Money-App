import * as Type from './type'
import Axios from 'axios'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'

export const register = (user,history) => {
    return (dispatch)=>{
        Axios.post('/api/users/register',user)
        .then((res)=>{
            dispatch({
                type : Type.USER_ERROR,
                payload : {
                    error : {}
                }
            })
            //console.log(res);
            history.push('/login')
        })
        .catch((error)=>{
           dispatch({
               type : Type.USER_ERROR,
               payload : {
                   error : error.response.data
               }
           }) 
        })
    }
} 

export const login = (user,history) => dispatch =>{
    Axios.post('/api/users/login',user)
        .then((res)=>{
           let token = res.data.token
           localStorage.setItem('auth_token',token)
           setAuthToken(token)
           let decode = jwtDecode(token)
           //console.log(decode);
           dispatch({
               type : Type.SET_USER,
               payload : {
                   user : decode
               }
           })
            history.push('/')
        })
        .catch((error)=>{
            //console.log(error.response.data);
            
           dispatch({
            type : Type.USER_ERROR,
            payload : {
                error : error.response.data
            }
           })
        })
}

export const logout = (history) =>{
    localStorage.removeItem('auth_token')
    history.push('/login')
    return{
        type : Type.SET_USER,
        payload : {
            user : {}
        }
    }
}