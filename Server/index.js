const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 5500;

app.use(cors());

app.get('api/weather',async (req,res)=>{
    const {city} = req.query;
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
        );


    } catch (error) {
        console.error("Error fetching weather data:",error)
        res.status(500).json({error: "Internal Server Error"});

    }

})

app.listen(port,()=>{
    console.log("Server is running on port " + port)
})