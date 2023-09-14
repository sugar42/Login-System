const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();


const authRoutes = require("./routes/authRoutes");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express());
app.use(cors({
    origin: 'http://localhost:3000', // Update with your frontend's actual origin
    credentials: true, // Enable credentials (cookies, headers, etc.) if needed
}));
app.use('/api/auth', authRoutes);

const server = http.createServer(app);



mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log(`Server is listening on ${PORT}`);
        });
    })
.catch((err) => {
    console.log('Database conection failed. Server not started yet')
});


