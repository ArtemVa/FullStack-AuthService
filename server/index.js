const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const router = require('./router/index.js')
const errorsMiddleware = require('./middleware/error-middleware.js')


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorsMiddleware);

const start = async() => {
    try {
        app.listen(process.env.PORT, () => {
            console.log('server started')
        });
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongo connect');
    } catch (e) {
        console.log(e);
    }
}

start();