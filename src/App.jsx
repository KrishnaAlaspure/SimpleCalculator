import React, { useState, useEffect, useReducer} from 'react';
import './App.css'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import DarkModeToggle from './components/DarkModeToggle';

export const Action={
  ADD_DIGIT:"add-digit",
  CHOOSE_OPERATION:"choose-operation",
  CLEAR:"clear",
  DELETE_DIGIT:"delete-digit",
  EVALUATE:"evaluate"
}

function reducer(state,{type, playload}){
  switch(type){
    case Action.ADD_DIGIT:
      if(state.overwritten){
        return{
          ...state,
          currentOperator:playload.digit,
          overwritten:false
        }
      }
      if(playload.digit==="0" && state.currentOperator==="0"){return state } 
      if(playload.digit==="."&& state.currentOperator.includes(".")){return state}
      return{
        ...state,
        currentOperator:`${state.currentOperator || ""}${playload.digit}`
      }
    case Action.CLEAR:
      return{}
    case Action.CHOOSE_OPERATION:
      if(state.currentOperator==null && state.previousOperator==null){
        return state
      }
      if(state.previousOperator==null){
        return{
          ...state,
          operation:playload.operation,
          previousOperator:state.currentOperator,
          currentOperator:null
        }
      }
      return{
        ...state,
        previousOperator:evaluate(state),
        operation:playload.operation,
        currentOperator:null
      }
    case Action.EVALUATE:
      if(state.operation==null || state.previousOperator==null || state.currentOperator==null)
        return {...state}
      return{
        ...state,
        overwritten:true,
        previousOperator:null,
        operation:null,
        currentOperator:evaluate(state)
      }
    case Action.DELETE_DIGIT:
      if(state.overwritten){
        return{
          ...state,
          overwritten:false,
          currentOperator:null
        }
      }
      if(state.currentOperator==null){
        return{...state}
      }
      if(state.currentOperator.length===1){
        return{
          ...state,
          currentOperator:null
        }
      }
      return{
        ...state,
        currentOperator:state.currentOperator.slice(0,-1)
      }
    }
}

function evaluate({currentOperator,previousOperator,operation}){
  const previous=parseFloat(previousOperator)
  const current=parseFloat(currentOperator)
  if(isNaN(previous)||isNaN(current))return''
  let compute=''
  switch (operation){
    case "/":
      compute=previous/current;
      break;
    case "*":
      compute=previous*current;
      break;
    case "+":
      compute=previous+current;
      break;
    case "-":
      compute=previous-current;
      break;
  }
  return compute.toString()
}

const INTEGER_FORMATTER= new Intl.NumberFormat('en-US', {
  maximuimFractionDigits:0 
})

function FormatOperand(operand){
  if(operand==null)return
  const[integer,decimal]=operand.split(".")
  if(decimal==null){return INTEGER_FORMATTER.format(operand)}
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


function App() {
  const [{currentOperator,previousOperator,operation},dispatch]=useReducer(reducer,{})
 return(
  <>
   <DarkModeToggle/>
  <div className="calculator-grid">
    <div className="output">
      <div className="previous-operant">{FormatOperand(previousOperator)}{operation}</div>
      <div className="current-operant">{FormatOperand(currentOperator)}</div>
    </div>
    <button className='span-two' onClick={()=>dispatch({type:Action.CLEAR})}> AC</button>
    <button onClick={()=>dispatch({type:Action.DELETE_DIGIT})}>Del</button>
    <OperationButton operation='/' dispatch={dispatch}/>
    <DigitButton digit='1' dispatch={dispatch} />
    <DigitButton digit='2'dispatch={dispatch} />
    <DigitButton  digit='3' dispatch={dispatch} />
    <OperationButton operation='*' dispatch={dispatch}/>
    <DigitButton digit='4' dispatch={dispatch} />
    <DigitButton digit='5' dispatch={dispatch} />
    <DigitButton digit='6' dispatch={dispatch} />
    <OperationButton operation='+' dispatch={dispatch}/>
    <DigitButton digit='7' dispatch={dispatch} />
    <DigitButton digit='8' dispatch={dispatch} />
    <DigitButton digit='9' dispatch={dispatch} />
    <OperationButton operation='-' dispatch={dispatch}/>
    <DigitButton digit='0' dispatch={dispatch} />
    <DigitButton digit='.' dispatch={dispatch} />
    <button className='span-two' onClick={()=>dispatch({type:Action.EVALUATE})}>=</button>
  </div>
  </>
 )
}
export default App;
