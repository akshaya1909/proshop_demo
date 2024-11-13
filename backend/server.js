import path from 'path'
import express from 'express';

// setting up server to read environment variables from .env file
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// reads the .env file and loads the variable into process.env (global object that contains env variables for current process)
dotenv.config();


const port = process.env.PORT || 5000;
connectDB(); //Connect to MongoDB
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send({
    clientId: process.env.PAYPAL_CLIENT_ID
}));

const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    // any route that is not api will be redirected to index.html
    app.get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
)
}
else{
    // (URL/ API endpoints, (req, res as arrow function))
    app.get('/', (req, res) => {
    res.send('API is running...');
    });
}

app.use(notFound);
app.use(errorHandler);

// starts the express server and listens to the port.
// Once the port starts, it this message is shown in console
app.listen(port, () => console.log(`Server running on port ${port}`));