let inputData = document.querySelector('input');
let back = document.querySelector('.container');
let tempretureId = document.getElementById('tempretureId')
let placeId = document.getElementById('placeId')
let feelTempreture = document.getElementById('feelTempreture')
let text = document.getElementById('text')
let form = document.querySelector('form');


let capital = inputData.value.charAt(0);
capital = capital.toUpperCase();
inputData.value = capital + inputData.value.slice(1);



let dataFetch = async () => {

    if (inputData.value === "" || inputData.value === null) {
        placeName = "indore"
    }
    else {
        placeName = inputData.value
    }

    try {
        let res = await fetch(`https://api.weatherapi.com/v1/current.json?key=650fe83132234e17a43112034230507&q=${placeName}&aqi=yes`)
        let data = await res.json();
        placeId.innerHTML = data.location.name
        tempretureId.textContent = `${data.current.temp_c}\xB0`
        feelTempreture.textContent = `Feels like ${data.current.feelslike_c}\xB0`
        text.textContent = data.current.condition.text
        humidity.textContent = `Humidity  ${data.current.humidity} %`
        windDirection.textContent = `Wind direction  ${data.current.wind_dir}`
        cloud.textContent = `Cloud  ${data.current.cloud} %`
        windspeed.textContent = `Wind speed  ${data.current.wind_kph} kph`



        // console.clear();


        if (data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/116.png') {
            imgs.src = 'sun_cloud.png'
        } else if (data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/386.png' || data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/176.png') {
            imgs.src = 'sun_cloud_rain.png'
        }
        else if (data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/302.png') {
            imgs.src = 'cloud_rain.png'
        }
        else if (data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/143.png' || data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/119.png') {
            imgs.src = 'cloud.png'
        }
        else if (data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/day/113.png') {
            imgs.src = 'sun.png'
        }
        else if (data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/night/113.png' || data.current.condition.icon === '//cdn.weatherapi.com/weather/64x64/night/119.png') {
            imgs.src = 'moon.png'
        }

        else {
            imgs.src = data.current.condition.icon
        }
    } catch (error) {
        let alerts = document.querySelector('.alertBox')
        let alertFunc = () => {
            alerts.innerHTML = `<div class="alert" data-aos="fade-down" data-aos-duration="800" >
          Please enter a valid city !
            </div>`
            setTimeout(function () {
                alerts.innerHTML = "";
            }, 2600)
        }
        alertFunc();
        console.error(error)
    }

}

dataFetch();
let back_image = async () => {
    let res = await fetch(`https://source.unsplash.com/random/1200X900?weather`);
    background_Image.setAttribute('src', res.url)
    // document.body.style.backgroundImage = `url(${res.url})`;
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    dataFetch();
    back_image();
    form.reset();
})

inputData.focus();

