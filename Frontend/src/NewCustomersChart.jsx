// NewCustomersChart.jsx
import React, { useEffect, useState } from 'react';
import {Bar, Bubble, Line, Scatter } from 'react-chartjs-2';
import axios from 'axios';

const NewCustomersChart = ()=> {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/new-customers-over-time');
        const newCustomersData = response.data;
       
        if (newCustomersData.length === 0) {
          console.log('No data available.');
          return;
        }

        const labels = newCustomersData.map(item => item.date);
        const data = newCustomersData.map(item => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: 'New Customers Added',
              data,
              fill: false,
              backgroundColor: ['black','green','yellow'],
              borderColor: 'green',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default NewCustomersChart;
