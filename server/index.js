const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

const userRoute = require('./Routes/userRoute')
console.log(userRoute);

// middleware

app.use(express.json());
app.use(cors());
app.use('/users', userRoute)


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.taokb31.mongodb.net/chatterWave?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(uri)
    .then(() => console.log('MongoDb connection established'))
    .catch((err) => console.log('MongoDB connection failed :',err.messages))


    app.get('/',(req,res) =>{
        res.send('welcome to chatterWave APIs')
    })

app.listen(port, (req, res) => {
    console.log(`chatterWave are running on port : ${port}`);
})

