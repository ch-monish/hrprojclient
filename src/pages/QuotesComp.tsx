import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../app/store';
import { getquoteaction} from "../features/Quotes/quoteslice"

const QuotesComp=()=> {
    const count = useSelector((state:RootState)=>state.counter.value);
    const quotestr = useSelector((state:RootState)=>state.quote);
    // const quoteauthor = useSelector((state:RootState)=>state.quote.author);
const [num,setnum]=useState(1)
    const dispatch=useDispatch();
  return (
    <div>
        <label>quote no</label>
        <input type="number" value={num} onChange={async e=>{console.log(parseInt(e.target.value));await setnum(parseInt(e.target.value));await dispatch(getquoteaction(num))}}></input>
        <button onClick={e=>dispatch(getquoteaction(num))}>get</button>
        {/* <button onClick={e=>dispatch(ex())}>get</button> */}
        <br>
        </br>
        {quotestr.id}
        <br></br>
        {quotestr.desc}
        <br></br>
        <label style={{color:"blue"}}>
            {quotestr.author}
            </label>

    </div>
  )
}

export default QuotesComp