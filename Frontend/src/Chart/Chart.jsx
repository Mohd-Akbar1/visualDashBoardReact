import React from 'react'
import './chart.css'
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import SalesOverTimeChart from '../Sales/SalesOverTimeChart';
import SalesGrowthRateChart from '../SalesGrowthRateChart';
import NewCustomersChart from '../NewCustomersChart';
import CustomerDistributionMap from '../CustomerDistributionMap';
import CustomerDistributionChart from '../CustomerDistributionMap';
// import RepeatCustomersChart from '../RepeatCustomerChart';


const Chart = () => {

  
  

  return (
    <div className='chartComponenet'>
        <div className='mychart'>
        <h1>Visualize Board</h1>
          <div className="charts">
            <p>Total Sales Over Time</p>
           <SalesOverTimeChart/>
           
          </div>
          <div className="charts">
            <p>Sales Growth Rate Over Time</p>
            <SalesGrowthRateChart/>
          </div>
          
         
          <div className="charts">
            <p>New Customers Added Over Time</p>
            <NewCustomersChart/>
          </div>
          
          <div className="charts">
            <p>Geographical Distribution of Customers</p>
            <CustomerDistributionChart/>
          </div>

        </div>
        
        

      
      
      
    </div>
  )
}

export default Chart
