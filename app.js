require('dotenv').config()
const express = require("express"); //adding express modules
const https = require("https"); // Adding in build module https
const bodyParse = require("body-parser");
const ejs = require("ejs");
const app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(bodyParse.urlencoded({ extended: true }));

// Global variable
const date = new Date();


// requesting to api 
app.get("/", (req, res) => {

    const apiKey = process.env.API_KEY;
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=" + apiKey + "&units=" + unit + "";


    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data); // responsed data
            const weatherTemp = weatherData.main.temp; // weather tempature
            const weatherDescription = weatherData.weather[0].description; // weather description
            const icon = weatherData.weather[0].icon; // weather icon id from json
            const imgurl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // weather icon url
            const cityName = weatherData.name;
            const windSpeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const cloudy = weatherData.clouds.all;
            const feelsLike = weatherData.main.feels_like;


            res.render("home", {
                cityName: cityName,
                weatherDescription: weatherDescription,
                weatherTemp: weatherTemp,
                weatherDescription: weatherDescription,
                imgurl: imgurl,
                windSpeed: windSpeed,
                humidity: humidity,
                cloudy: cloudy,
                feelsLike: feelsLike,
                clock: `${date.getHours()}: ${date.getMinutes()}`,
                date: date.toDateString()
            });
        });

        response.on("error", (err) => {
            console.log(err);
        });
    });
});

app.post("/", (req, res) => {


    const query = req.body.cityName;
    const apiKey = "f67f6acb62a497586156160e65f1bf7c";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(url, (response) => {

        response.on("data", (data) => {
            const weatherData = JSON.parse(data); // responsed data
            const weatherTemp = weatherData.main.temp; // weather tempature
            const weatherDescription = weatherData.weather[0].description; // weather description
            const icon = weatherData.weather[0].icon; // weather icon id from json
            const imgurl = `http://openweathermap.org/img/wn/${icon}@2x.png`; // weather icon url
            const cityName = weatherData.name;
            const windSpeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            const cloudy = weatherData.clouds.all;
            const feelsLike = weatherData.main.feels_like;


            res.render("home", {
                cityName: cityName,
                weatherDescription: weatherDescription,
                weatherTemp: weatherTemp,
                weatherDescription: weatherDescription,
                imgurl: imgurl,
                windSpeed: windSpeed,
                humidity: humidity,
                cloudy: cloudy,
                feelsLike: feelsLike,
                clock: `${date.getHours()}: ${date.getMinutes()}`,
                date: date.toDateString()
            });
        });

        response.on("error", (err) => {
            console.log(err);
        });
    });
});


app.get("/about", (req, res) => {
    res.render("about");
});
app.get("/contact", (req, res) => {
    res.render("contact");
});





app.listen(3000, () => {
    console.log("server is running at port 3000.");
});