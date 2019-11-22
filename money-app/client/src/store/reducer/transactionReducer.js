import * as Type from '../actions/type'

const transactionReducer = (state = [],action) =>{
    switch (action.type) {
        case Type.LOAD_TRANSACTIONS: {
            return action.payload.transactions
        }
        case Type.CREATE_TRANSACTION : {
            let transactions = [ ...state]
            transactions.unshift(action.payload.transaction)
            return transactions
        }
        case Type.REMOVE_TRANSACTION : {
            let transactions = [...state]
            return transactions.filter((trans)=>{
                return trans._id !== action.payload.id
            })
        }
        case Type.UPDATE_TRANSACTION : {
            let transactions = [...state]
            return transactions.map((tran)=>{
                if (tran._id === action.payload.transaction._id) {
                    return action.payload.transaction
                }
                return tran
            })
        }
        default: return state
    }
}

export default transactionReducer