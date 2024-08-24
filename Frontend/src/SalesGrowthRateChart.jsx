// SalesGrowthRateChart.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const SalesGrowthRateChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sales-growth-rate-daily');
        const growthData = response.data;

        if (growthData.length === 0) {
          console.log('No data available.');
          return;
        }

        const labels = growthData.map(item => item.date);
        const data = growthData.map(item => parseFloat(item.growthRate));

     
        

        setChartData({
          labels,
          datasets: [
            {
              label: 'Sales Growth Rate (%)',
              data,
              fill: false,
              backgroundColor:[ 'rgba(153,102,255,0.4)','yellow','red','black'],
              borderColor: 'blue',
              tension: 0.1
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching growth rate data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        },
        ticks: {
          autoSkip: true,
          maxTicksLimit: 20
        }
      },
      y: {
        title: {
          display: true,
          text: 'Growth Rate (%)'
        }
      }
    }
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default SalesGrowthRateChart;
