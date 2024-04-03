import React from 'react'
import { Action } from './App'

export default function OperationButton({dispatch,operation}) {
  return (
    <button onClick={()=>dispatch({type:Action.CHOOSE_OPERATION,playload:{operation}})}>{operation}</button>
  )
}
