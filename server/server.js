require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/db');
const authRouter = require('./routes/auth-route');
const problemRouter = require('./routes/problem-routes');
const foodItemRouter = require('./routes/foodItemRoutes'); // Add this line
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser'); //
// CORS options
const corsOptions = {
  origin: "https://canteen-wallah.vercel.app/",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' })); // Add this line to increase payload size limit
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Add this line to increase payload size limit

// Mount the routers
app.use('/api/auth', authRouter);
app.use('/api/problems', problemRouter);
app.use('/api/foodItems', foodItemRouter);

// Start the server after connecting to the database
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
