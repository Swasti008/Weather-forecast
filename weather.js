
function getInputData() {
    let cityName = document.getElementById("city").value;
    return cityName;
}

function getlanlon(cityName) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=32a5938ce2b337c33bc2af933247d11c`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response)
            let latitude = response[0].lat;
            let longitude = response[0].lon;
            console.log(latitude, longitude)
            getData(latitude, longitude, cityName)
        })
        .catch((error) => {
            console.log("Sorry some error occurred", error);
        });
}
function getData(lat, lon, city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=32a5938ce2b337c33bc2af933247d11c`)
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response)
            storeData(response, city)
        })
        .catch((error) => {
            console.log("Sorry some error occurred", error);
        });
}

let btn = document.getElementById("search");
btn.addEventListener("click", function () {
    const cityName = getInputData();
    getlanlon(cityName);
});

function storeData(data, city) {
    let weatherContainer = document.getElementById("weather-data");

    // Removing existing weather data
    while (weatherContainer.firstChild) {
        weatherContainer.removeChild(weatherContainer.firstChild);
    }

    function createAndadd(tag, content) {
        let tagname = document.createElement(tag);
        tagname.setAttribute("class", "weatherElement");

        if (tag === "img") {
            let image = new Image();//for creating new image element after it is loaded , we will change the src.
            image.onload = function () {
                tagname.src = content;
            };
            image.src = content;
        } else {
            tagname.innerText = content;
        }

        weatherContainer.appendChild(tagname);
    }


    createAndadd("h2", city.toUpperCase());
    let description = (data.weather[0].description || 'Unknown').toLowerCase();
    //for different images
    function changeImages(description) {
        switch (description) {
            case "smoke":
                return "./assets/smoke.png";
            case "rain":
                return "./assets/rain.gif";
            case "clouds":
                return "./assets/clouds.gif";
            case "snow":
                return "./assets/snowflake.gif";
            case "broken clouds":
                return "./assets/clouds.png";
            case "clear sky":
                return "./assets/sun.png"
            default:
                return "./assets/clouds.png";
        }
    }

    console.log("Description:", description);
    console.log("date", new Date())
    createAndadd("p", `${new Date().getDate()}` + `/${`${new Date()}`.slice(4, 7)}` + `/${new Date().getFullYear()}`);

    createAndadd("img", changeImages(description));
    createAndadd("p", description.toUpperCase())

    createAndadd("h3", "Feels like " + (data.main.temp - 273.15).toFixed(2) + "°C");
}

let container = document.getElementById("weather-container");
let weatherDataContainer = document.createElement("div");
weatherDataContainer.id = "weather-data";
container.appendChild(weatherDataContainer);


// Slideshow
let slideIndex = 0;

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.filter = "blur(5px)";
    setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", showSlides);//after loading the slideshow it will do other tasks.

