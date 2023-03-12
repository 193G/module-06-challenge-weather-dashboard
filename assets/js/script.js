var apiKey ="ccdd9b24c11281c38d5599dd95574989"
var cityInput =$("#cityName")
$("form").submit(function(e){
    e.preventDefault()
    var city =cityInput.val()
    console.log (city)
    currentWeather(city)
})

function currentWeather(city){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            $("#city-name").text(data.name)
            $("#currentIcon").attr("src",`http://openweathermap.org/img/w/${data.weather[0].icon}.png`)
            $("#temperature").text(data.main.temp)
            $("#humidity").text(data.main.humidity)
            $("#wind-speed").text(data.wind.speed)
            fiveDayForecast(city)
        });
}

function fiveDayForecast(city){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            var forecast = data.list
            for (let i = 0; i < 5; i++) {
                $("#day-"+i).text(forecast[i].dt_txt.slice(0,9))
                $("#img-"+i).attr("src",`http://openweathermap.org/img/w/${forecast[i].weather[0].icon}.png`)
                $("#temp-"+i).text("tempreture "+forecast[i].main.temp)
                $("#hum-"+i).text(forecast[i].main.humidity)
            }
        });
}
