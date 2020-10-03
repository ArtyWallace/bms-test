const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const router = require('./routes');

const app = express();
const PORT = 4000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/api/users', router);
app.use('/', express.static(path.join(__dirname, '../client/dist')));

const start = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, err => console.log(`Server has been started on ${PORT} port`));
    } catch (err) {
        console.log(err);
    }
    
}

start();