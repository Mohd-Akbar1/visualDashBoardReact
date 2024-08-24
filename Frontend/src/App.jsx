import { useState } from 'react'

import './App.css'
import Nav from './component/Nav/Nav'
import Side from './component/sidebar/Side'
import Chart from './Chart/Chart'

function App() {
  

  return (
    <>
    <Nav/>
    <div className="bodydata">
      <Side/>
      <Chart/>
    </div>
     
        
    </>
  )
}

export default App
