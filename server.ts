// Modules
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Import Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

// Initialize app
const app = express();

// Initialize configs
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

//------------DATABASE---------------//
const mongoUrl: string = process.env.MONGO_LOCAL as string;

// Connect to database
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("  MongoDB is connected successfully.");
    },
).catch((err: any) => {
    console.error("  MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

// Use Promises in Mongoose
mongoose.Promise = global.Promise;

//------------ROUTES---------------//

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

//------------SERVER---------------//

// Start Server
app.listen(5000, function() {
  console.log("Server is running on Port: " + 5000);
});

module.exports = app;