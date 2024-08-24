import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const CustomerDistributionChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get('https://visualdashboardreact.onrender.com/api/customer-distribution-by-city');
        const cityData = response.data;
        
        

        const cities = cityData.map(item => item.city || 'Unknown');
        const counts = cityData.map(item => item.count);

        setChartData({
          labels: cities,
          datasets: [
            {
              label: 'Number of Customers',
              data: counts,
              backgroundColor: ['yellow','red','blue','pink','green','orange'],
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching customer distribution data:', error);
        setError('Failed to load data.');
      }
    };

    fetchCityData();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Bar
        data={chartData} 
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { 
              title: { display: true, text: 'City' } 
            },
            y: { 
              title: { display: true, text: 'Number of Customers' }, 
              beginAtZero: true 
            }
          }
        }} 
      />
    </div>
  );
};

export default CustomerDistributionChart;
