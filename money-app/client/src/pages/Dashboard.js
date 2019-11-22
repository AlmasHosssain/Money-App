import React from 'react'
import { connect } from 'react-redux'
import {loadTransaction,removeTransaction,} from '../store/actions/transactionAction'
import CreateTransaction from '../components/transaction/CreateTransaction'
import UpdateTransaction from '../components/transaction/UpdateTransaction'

class Dashboard extends React.Component{

    state = {
        createModalOpen : false,
        updateModelOpen : false,
        id : ''
    }

    openCreateModel = () =>{
        this.setState({
            createModalOpen : true
        })
    }

    closeCreateModel = () =>{
        this.setState({
            createModalOpen : false
        })
    }

    openUpdateModel = (id) =>{
        this.setState({
            updateModelOpen : true,
            id
        })
    }

    closeUpdateModel = () =>{
        this.setState({
            updateModelOpen : true,
            id : ''
        })
    }

    componentDidMount(){
        this.props.loadTransaction()
    }

    render(){
        
        let {auth,transactions} = this.props
        
        return(
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome {auth.user.name}</h1>
                    <p>Your Email Account Is : {auth.user.email}</p>
                    <button
                        className = "btn btn-primary"
                        onClick = {this.openCreateModel}
                    >Add New Transaction</button>
                    <CreateTransaction
                        isOpen = {this.state.createModalOpen}
                        close = {this.closeCreateModel}
                     />
                    <br/>
                    <br/>
                    <h1>Transactions:</h1>
                    <ul className="list-group">
                        {
                            transactions.map(transaction=>(
                                <li 
                                key = {transaction._id}
                                className = "list-group-item"> 
                                <p>Type : {transaction.type}</p>
                                <p>Amount : {transaction.amount}</p>
                                <p>Type : {transaction.note}</p>

                                {
                                    this.state.id == transaction._id ? 
                                    <UpdateTransaction
                                        isOpen = {this.state.updateModelOpen}
                                        close = {this.closeUpdateModel}
                                        transaction = {transaction}
                                    /> : 
                                    null
                                } 

                                <button
                                 className="btn btn-danger"
                                 onClick = {()=>this.props.removeTransaction(transaction._id)}
                                 >Remove</button>

                                 <button
                                 className="btn btn-success"
                                 onClick = { ()=>this.openUpdateModel(transaction._id)}
                                 >Update</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.auth,
    transactions : state.transactions
}) 

export default connect(mapStateToProps,{loadTransaction,removeTransaction})(Dashboard)