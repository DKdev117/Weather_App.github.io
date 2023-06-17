getLocation();
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  getName(latitude, longitude);
}

async function getName(latitude, longitude) {
  var access_key = "fc3a65fc9ebd7761b6cd0379e6cb3775";
  var url =
    `https://api.openweathermap.org/geo/1.0/reverse?lat=` +
    latitude +
    `&lon=` +
    longitude +
    `&limit=5&appid=` +
    access_key;
  var res = await fetch(url);
  var data = await res.json();
  var location = data[0].name.split(" ")[0];
  //   console.log(location);
  fetchData(location);
}

function findWeather() {
  var location = document.getElementById("search").value;
  fetchData(location);
  location = document.getElementById("search").value = "";
}

async function fetchData(location) {
  var url =
    `https://api.weatherapi.com/v1/current.json?key=1c63857a8e0548f9a1a152750210909&q=` +
    location +
    `&aqi=yes`;
  var res = await fetch(url);
  var data = await res.json();
  if (res.status == 200) {
    setValues(data);
  } else {
    var tags = document.getElementsByClassName("reset");
    for (let index = 0; index < tags.length; index++) {
      tags.item(index).innerHTML = "";
    }
    document.getElementById("name").innerHTML = "Location not Found.";
    document.getElementById("not").innerHTML = "Data Not Found.";
    document.getElementById("404").innerHTML = "404";
    document.getElementById("Cloudy").innerHTML = "";
    document.getElementById("Humidity").innerHTML = "";
    document.getElementById("Wind").innerHTML = "";
    document.getElementById("Wind Gusts").innerHTML = "";
    document.getElementById("Precipitation").innerHTML = "";
    document.getElementById("Pressure").innerHTML = "";
    document.getElementById("Visibility").innerHTML = "";
    document.getElementById("UV Radiation").innerHTML = "";
  }
}

function setValues(data) {
  var setter = document.getElementById("temperature");
  setter.innerHTML = data.current.temp_c + `&#176`;

  setter = document.getElementById("name");
  setter.innerHTML = data.location.name;

  setter = document.getElementById("region");
  setter.innerHTML = data.location.region + `, ` + data.location.country;

  setter = document.getElementById("feelslike_c");
  setter.innerHTML = `Feels like ` + data.current.feelslike_c + `&#176`;

  setter = document.getElementById("geo");
  setter.innerHTML = data.current.condition.text;

  setter = document.getElementById("Cloudy");
  setter.innerHTML = data.current.cloud + `%`;

  setter = document.getElementById("Humidity");
  setter.innerHTML = data.current.humidity + `%`;

  setter = document.getElementById("Wind");
  setter.innerHTML = data.current.wind_kph + ` Km/h ` + data.current.wind_dir;

  setter = document.getElementById("Wind Gusts");
  setter.innerHTML = data.current.gust_kph + ` Km/h`;

  setter = document.getElementById("Precipitation");
  setter.innerHTML = data.current.precip_mm + `mm`;

  setter = document.getElementById("Pressure");
  setter.innerHTML = data.current.pressure_mb + `mb`;

  setter = document.getElementById("Visibility");
  setter.innerHTML = data.current.vis_km + ` KM`;

  setter = document.getElementById("UV Radiation");
  setter.innerHTML = data.current.uv + ` `;
}

// SetDate

var date = new Date();
var day = date.getDay();
var month = date.getMonth();
switch (month) {
  case 0:
    month = "January";
    break;
  case 1:
    month = "February";
    break;
  case 2:
    month = "March";
    break;
  case 3:
    month = "April";
    break;
  case 4:
    month = "May";
    break;
  case 5:
    month = "June";
    break;
  case 6:
    month = "July";
    break;
  case 7:
    month = "August";
    break;
  case 8:
    month = "September";
    break;
  case 9:
    month = "October";
    break;
  case 10:
    month = "November";
    break;
  case 11:
    month = "December";
    break;
}
switch (day) {
  case 0:
    day = "Sunday";
    break;
  case 1:
    day = "Monday";
    break;
  case 2:
    day = "Tuesday";
    break;
  case 3:
    day = "Wednesday";
    break;
  case 4:
    day = "Thursday";
    break;
  case 5:
    day = "Friday";
    break;
  case 6:
    day = "Saturday";
    break;
}
document.getElementById("date").innerHTML =
  date.getHours() +
  `:` +
  date.getMinutes() +
  ` - ` +
  day +
  `, ` +
  date.getDate() +
  ` ` +
  month +
  ` ` +
  date.getFullYear();
