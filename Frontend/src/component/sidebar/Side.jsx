import React from 'react'
import './side.css'
import { Colors } from 'chart.js'
const Side = () => {
  return (
    <div className='sidebar'>
        <div className="contentbar">
        <p style={{ color: 'grey', fontWeight: 600 ,fontSize:"1.2rem"}}>Pages</p>

            <div className="sideNav">Market</div>
            <div className="sideNav">Tading</div>
            <div className="sideNav">Loans</div>
            <div className="sideNav">wallet</div>
            <div className="sideNav">Portfolio</div>
            <div className="sideNav">Liquidity Pool</div>
            <div className="sideNav">Swap</div>

        </div>

        <div className="UIelement">
        <p style={{ color: 'grey', fontWeight: 600 ,fontSize:"1.2rem"}}>UI Element</p>
           
            <div className="sideNav">menu style</div>
            <div className="sideNav">Table</div>
            <div className="sideNav">Charts</div>
            <div className="sideNav">Forms</div>
            <div className="sideNav">Pricing</div>
            <div className="sideNav">Setting</div>
            <div className="sideNav">Modals/Pop-Ups</div>
           
        </div>
      
    </div>
  )
}

export default Side
