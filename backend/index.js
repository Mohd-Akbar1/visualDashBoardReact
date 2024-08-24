const express = require('express');
const mongoose = require('mongoose');

const app = express();
const  cors=require('cors')

const mongoUri = 'mongodb+srv://db_user_read:zHLuO45zk1upaRmp@cluster0.aaflc.mongodb.net/RQ_Analytics';

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('Connected to MongoDB database: RQ_Analytics'))
  .catch(err => console.error('Could not connect to MongoDB:', err));


app.use(cors())

const shopifyOrders = mongoose.connection.collection('shopifyOrders');










// API endpoint for Total Sales Over Time 
app.get('/api/sales-over-time', async (req, res) => {
    try {
      const salesData = await mongoose.connection.db.collection('shopifyOrders').aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: { dateString: "$created_at" } 
            }
          }
        },
        {
          $group: {
            _id: {
              year: { $year: "$created_at_date" },
              month: { $month: "$created_at_date" },
              day: { $dayOfMonth: "$created_at_date" }
            },
            totalSales: { $sum: { $toDouble: "$total_price_set.shop_money.amount" } }
          }
        },
        {
          $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
        }
      ]).toArray();
  
      res.json(salesData);
    } catch (error) {
      console.error('Error fetching sales data:', error.message);
      res.status(500).json({ message: 'Error fetching sales data.', error: error.message });
    }
  });
  


/// Sales Growth Rate Over Time

app.get('/api/sales-growth-rate-daily', async (req, res) => {
    try {
      const dailySales = await shopifyOrders.aggregate([
        {
          $addFields: {
            created_at_date: {
              $dateFromString: { dateString: "$created_at" }
            },
            total_price_number: {
              $convert: { input: "$total_price", to: "double", onError: 0 }
            }
          }
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$created_at_date" } },
            totalSales: { $sum: "$total_price_number" }
          }
        },
        { $sort: { "_id": 1 } } 
      ]).toArray();
  
      // Calculate growth rates
      const growthRates = [];
      for (let i = 1; i < dailySales.length; i++) {
        const previous = dailySales[i - 1];
        const current = dailySales[i];
  
        const previousSales = previous.totalSales || 0;
        const currentSales = current.totalSales || 0;
  
        let growthRate = 0;
        if (previousSales > 0) {
          growthRate = ((currentSales - previousSales) / previousSales) * 100;
        }
  
        growthRates.push({
          date: current._id,
          growthRate: growthRate.toFixed(2) 
        });
      }

      res.json(growthRates);
    } catch (err) {
      res.status(500).json({ message: "Error fetching sales growth rate data.", error: err.message });
    }
  });
  




//api for new customer over time

app.get('/api/new-customers-over-time', async (req, res) => {
  try {
    const interval = req.query.interval || 'daily';

    let dateFormat;
    switch (interval) {
      case 'monthly':
        dateFormat = "%Y-%m";
        break;
      case 'quarterly':
        dateFormat = "%Y-Q%q";
        break;
      case 'yearly':
        dateFormat = "%Y";
        break;
      case 'daily':
      default:
        dateFormat = "%Y-%m-%d";
        break;
    }

    const newCustomers = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
      {
        $addFields: {
          created_at_date: {
            $dateFromString: { dateString: "$created_at" }
          }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: dateFormat, date: "$created_at_date" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]).toArray();

    const formattedData = newCustomers.map(item => ({
      date: item._id,
      count: item.count
    }));
   
    res.json(formattedData);
  } catch (err) {
    console.error('Error fetching new customers data:', err); 
    res.status(500).json({ message: "Error fetching new customers data.", error: err.message });
  }
});







//Api end point for customer-distribution-by-city

app.get('/api/customer-distribution-by-city', async (req, res) => {
  try {
    const distribution = await mongoose.connection.db.collection('shopifyCustomers').aggregate([
      
      {
        $group: {
          _id: "$default_address.city",
          customerCount: { $sum: 1 }
        }
      },
      {
        $sort: { customerCount: -1 }
      }
    ]).toArray(); 

    const formattedData = distribution.map(item => ({
      city: item._id,
      count: item.customerCount
    }));

    
    res.json(formattedData);
  } catch (err) {
    console.error('Error fetching customer distribution data:', err);
    res.status(500).json({ message: "Error fetching customer distribution data.", error: err.message });
  }
});



//api endpoint for Repeated customer
app.get('/api/repeat-customers', async (req, res) => {
  try {
   
    const repeatCustomers = await mongoose.connection.db.collection('shopifyOrders').aggregate([
      {
        $match: {
          'created_at': { $exists: true }  
        }
      },
      {
        $group: {
          _id: "$email", 
          purchaseCount: { $sum: 1 },  
          purchases: { $push: "$created_at" }  
        }
      },
      {
        $match: {
          purchaseCount: { $gt: 1 }  
        }
      },
      {
        $project: {
          _id: 0,
          email: "$_id",
          purchaseCount: 1,
          purchases: 1
        }
      }
    ]).toArray();  

    // Format the data for different time frames
    const getTimeFrameData = (data, timeFrame) => {
      return data.map(customer => {
        const countByTimeFrame = customer.purchases.reduce((acc, date) => {
          const formattedDate = new Date(date);
          let key;

          switch (timeFrame) {
            case 'daily':
              key = formattedDate.toISOString().split('T')[0];  // YYYY-MM-DD
              break;
            case 'monthly':
              key = `${formattedDate.getFullYear()}-${formattedDate.getMonth() + 1}`;  // YYYY-MM
              break;
            case 'quarterly':
              const quarter = Math.floor((formattedDate.getMonth() / 3)) + 1;
              key = `${formattedDate.getFullYear()}-Q${quarter}`;  // YYYY-Qn
              break;
            case 'yearly':
              key = `${formattedDate.getFullYear()}`;  // YYYY
              break;
          }

          acc[key] = (acc[key] || 0) + 1;
          return acc;
        }, {});

        return {
          email: customer.email,
          purchaseCount: customer.purchaseCount,
          timeFrameData: countByTimeFrame
        };
      });
    };

    const dailyData = getTimeFrameData(repeatCustomers, 'daily');
    const monthlyData = getTimeFrameData(repeatCustomers, 'monthly');
    const quarterlyData = getTimeFrameData(repeatCustomers, 'quarterly');
    const yearlyData = getTimeFrameData(repeatCustomers, 'yearly');
    
    res.json({ dailyData, monthlyData, quarterlyData, yearlyData });
  } catch (err) {
    console.error('Error fetching repeat customer data:', err);
    res.status(500).json({ message: "Error fetching repeat customer data.", error: err.message });
  }
});





// Start the server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on 8000`);
});
