import React from 'react'
import { Action } from './App'
export default function DigitButton({dispatch,digit}) {
  
  return (
    
      <button onClick={()=>dispatch({type:Action.ADD_DIGIT,playload:{digit}})}>{digit}</button>
    
  )
}
