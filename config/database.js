
const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, { useNewUrlParser: true })
    .then(() =>{
        console.log('Connected to mongodb successfully!');
    })
    .catch((err) =>{
        console.log('Error connecting to mongodb');
    });
