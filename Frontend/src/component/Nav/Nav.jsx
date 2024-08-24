import React from 'react'
import './nav.css'
import { GoBellFill } from "react-icons/go";
import { MdAttachEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { LuFlag } from "react-icons/lu";
import { BiLogOutCircle } from "react-icons/bi";
import { SlMagnifier } from "react-icons/sl";

const Nav = () => {
  return (
    <div className='NavMainContainer'>   
        <div className="Navheader">
            <div className='Info'>
                <img src="https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/analytics-circle-blue-1024.png" width={"40px"} alt="" />
                <h2 style={{color:'blue'}}>Visual Board</h2>
                
                <BiLogOutCircle className='icons'/>
            </div>
            <div className='searchBar'>
               <div className="allsearchcontainer">
               <SlMagnifier /> <input type="text" id='Searchuser' placeholder='search...' />
               </div>
            </div>
            <div className='Profile'> 
            <GoBellFill className='icons'/>
            <MdAttachEmail className='icons' />
          
            <img src="https://nordicapis.com/wp-content/uploads/Profile-Pic-Circle-Grey-Large-1.png" alt="" width={"35px"} />
                <div className="name">
                    <span>John</span><span>Doe</span>
                    <p className='designation'>Designation</p>
                    
                </div>
                
              <img src="https://themayanagari.com/wp-content/uploads/2021/01/4-13.png" alt="" width={"45px"} />
            </div>
        </div>



      
    </div>
  )
}

export default Nav
