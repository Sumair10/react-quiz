import React from 'react'

export default ({question , dispatch , answer}) => {
    const hasAswered = answer !== null
  return (
    <div>
        <div className='options'>
            {question.options.map((option,index) => <button key={option} className={`btn btn-option ${index === answer ? 'answer' : ""}
            ${hasAswered ? index === question.correctOption ? "correct" : "wrong" : ""}`}
            disabled={hasAswered}
            onClick={()=>dispatch({type :'newAnswer' , payload : index })}
            >{option}</button>)}
        </div>
    </div>
  )
}