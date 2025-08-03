const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

app.get("/", async(req,res)=>{
    res.send("<h1>The server is up and running...</h1>")
})

app.get('/api/weather',async (req,res)=>{
    const {city} = req.query;
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
        );

        if (!response.ok) {
            console.error(`Weather API responded with status: ${response.status}`)
            return res.status(response.status).json({error: "Failed to fetch weather data"});
        }


    } catch (error) {
        console.error("Error fetching weather data:",error)
        res.status(500).json({error: "Internal Server Error"});

    }

})

app.listen(port,()=>{
    console.log("Server is running on port " + port)
})