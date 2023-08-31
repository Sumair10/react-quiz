import React from 'react'

export default ({totalQuestions ,dispatch}) => {
  return (
    <div className='start'>
      <h2>Welcome to the React Quiz!</h2>
        <h3>{totalQuestions} questions to test.</h3>
        <button onClick={()=>dispatch({type : 'start'})} className='btn btn-ui'>Lets Start</button>
    </div>
  )
}