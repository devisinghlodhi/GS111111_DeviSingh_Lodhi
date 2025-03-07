import React from 'react'
import { useDispatch } from 'react-redux'

export default function Store() {

  const dispatch = useDispatch();

  const handleModal = ()=>{
    dispatch({type: "openModal", payload: <h1>hiii</h1>})
  }

  return (
    <div>
      <button onClick={handleModal}>test</button>
      <h1>store page</h1>
    </div>
  )
}
