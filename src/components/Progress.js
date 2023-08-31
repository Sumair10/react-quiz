import React from 'react'

export default ({index , totalQuestions ,points, maxPoints , answer}) => {
  return (
   <header className='progress'>
       <progress max={totalQuestions} value={index + Number(answer !== null)}/>
       <p>Question <strong>{index + 1}</strong> / {totalQuestions}</p>
       <p><strong>{points}</strong> /{maxPoints}</p>
   </header>
  )
}