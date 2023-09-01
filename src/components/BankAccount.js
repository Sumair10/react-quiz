import React, {useReducer} from 'react'


const initialState ={
    balance : 0,
    loan : 0,
    isActive : false,
    loanTaken : false
}

const reducer =(state , action) =>{
    switch (action.type){
        case 'openAccount' :
            return {...state , isActive: true , balance: 500}
        case 'deposit' :
            return {...state , balance : state.balance + 150}
        case 'withdraw' :
            return {...state , balance : state.balance === 0 ? state.balance : state.balance - 50}
        case 'requestLoan' :
            const loan = state.loanTaken ? 0 : 5000
            return {...state , balance : state.balance + loan , loanTaken :true , loan : state.loanTaken ? state.loan : loan}
        case 'payLoan' :
            if(state.balance < 5000){
                return {...state}
            }
            return  {...state , loan : state.loanTaken ? 0 : state.loan , balance :state.loanTaken ?  state.balance -5000 : state.balance ,loanTaken :false}
        case 'closeAccount' :
            return {...state , isActive : state.balance !== 0  }
        default :
            return new Error('Unknown Action')
    }
}
export default () => {

    const [state  , dispatch] = useReducer(reducer , initialState)
    const { balance , loan , isActive} = state
    return (
        <div className="App">
            <h2>UseReducer Bank Account</h2>
            <h4>Balance : {balance}</h4>
            <h4>Loan : {loan}</h4>
            <p>
                <button className={`${isActive ? 'btn-disable' : 'btn' }  btn-ui`} onClick={() => {
                    dispatch({type: 'openAccount'})
                }} disabled={isActive}>Open Account
                </button>
            </p>
            <p>
                <button className={`${!isActive ? 'btn-disable' : 'btn' }  btn-ui`} onClick={() => {
                    dispatch({type: 'deposit'})
                }} disabled={!isActive}>Deposit 150
                </button>
            </p>
            <p>
                <button className={`${!isActive ? 'btn-disable' : 'btn' }  btn-ui`} onClick={() => {
                    dispatch({type: 'withdraw'})
                }} disabled={!isActive}>Withdraw 50
                </button>
            </p>
            <p>
                <button className={`${!isActive ? 'btn-disable' : 'btn' }  btn-ui`} onClick={() => {
                    dispatch({type: 'requestLoan'})
                }} disabled={!isActive}>Request a loan of 5000
                </button>
            </p>
            <p>
                <button className={`${!isActive ? 'btn-disable' : 'btn' }  btn-ui`} onClick={() => {
                    dispatch({type :'payLoan'})
                }} disabled={!isActive}>Pay Loan
                </button>
            </p>
            <p>
                <button className={`${!isActive ? 'btn-disable' : 'btn' }  btn-ui`} onClick={() => {
                    dispatch({type: 'closeAccount'})
                }} disabled={!isActive}>Close Account
                </button>
            </p>

        </div>
    )
}