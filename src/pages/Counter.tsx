import React from 'react'
import {incrementaction,decrementaction} from '../features/Counter/countersclice';
import  {watchercounter} from "../features/Counter/counterSaga"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
// import { RootState } from '../../app/store';
const  Counter=()=> {
    const count = useSelector((state:RootState)=>state.counter.value);
    const dispatch=useDispatch()
  return (
    <>
    <button onClick={()=>{dispatch(incrementaction())}}>+</button>
    {count}
    <button onClick={()=>dispatch(decrementaction())}>-</button>  
    </>
  )
}

export default Counter