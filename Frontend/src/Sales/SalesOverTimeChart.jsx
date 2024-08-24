import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import './sale.css'

const SalesOverTimeChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sales-over-time');
        const salesData = response.data;

        if (salesData && Array.isArray(salesData)) {
          const labels = salesData.map(item => `${item._id.year}-${item._id.month}-${item._id.day}`);
          const data = salesData.map(item => item.totalSales);

          setChartData({
            labels,
            datasets: [
              {
                label: 'Total Sales',
                data,
                fill: false,
                backgroundColor: ['rgba(75,192,192,0.4)',"black",'yellow','red'],
                borderColor: ['blue','red','yellow'],
              }
            ]
          });
        } else {
          console.error('Sales data ', salesData);
        }
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div className='saleschart' style={{ height: '400px', width: '100%' }} >
     
      {chartData.labels.length > 0 ? (
        <Line data={chartData}  options={options}/>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SalesOverTimeChart;
