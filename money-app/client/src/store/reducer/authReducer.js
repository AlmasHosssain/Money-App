import * as Type from '../actions/type'

const init = {
   isAuthenticate : false,
   user : {},
   error : {}
}

const authReducer = (state=init,action) =>{
    switch(action.type){
        case Type.SET_USER : {
            return {
                user : action.payload.user,
                isAuthenticate : Object.keys(action.payload.user).length !== 0,
                error : {}
            }
        }
        case Type.USER_ERROR : {
            return{
                ...state,
                error : action.payload.error
            }
        }
        default : return state
    }
}

export default authReducer