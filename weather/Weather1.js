let input = document.getElementById("input");
let click = document.getElementById("click");
let temp = document.getElementById("temp");
let locat = document.getElementById("locat");
let pr = document.getElementById("pr");
let hum = document.getElementById("hum");
let wnd = document.getElementById("wnd");
let cld = document.getElementById("cld");
let error = document.getElementById("error");
;

let apiKey = "2ad864b8c66fbf1e48caa02088e78306";

function Weather(prom) {
  fetch(prom)
    .then((data) => {
        return data.json()})
    .then((data) => {
      if (data!="") { 
        error.textContent=""
        locat.textContent = `Location: ${data.name}, ${data.sys.country}`;
        temp.textContent = `Temperature: ${Math.round(data.main.temp - 273.15)} °C`;
        pr.textContent = `Pressure: ${Math.round(data.main.pressure)} mb`;
        hum.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
        wnd.textContent = `Wind Speed: ${Math.round(data.wind.speed)} kmph`;
        cld.textContent = `Clouds: ${Math.round(data.clouds.all)} %`;
        let weath = document.getElementById("weather")
        if(data.clouds.all>=65){
            weath.style.background=`url("../Task/image/sun.avif")`
            weath.style.opacity="0.8"
            weath.style.backgroundSize="100%" 
            weath.style.color="black"
            
        }
        else if(data.clouds.all>=45){
              weath.style.background=`url("../Task/image/dark8385813.webp")`
            weath.style.backgroundSize="100%"
            weath.style.opacity="0.9"
            weath.style.color="white"
        }
        else{
          weath.style.background=`url("../Task/image/heavy-rain-in-dark-sky-background-vector-43472413.jpg")`
            weath.style.backgroundSize="cover"
            weath.style.opacity="0.9"
            weath.style.color="white"
        }
      } 
    })
    .catch(() => {
      error.textContent="Please Enter Correct Location"
    });
}

navigator.geolocation.getCurrentPosition(
  (position) => {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let prom1 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    Weather(prom1);
  }
);

click.addEventListener("click", () => {
  let place = input.value;
  if (place !="") {
    let prom = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apiKey}`;
    Weather(prom);
    input.value = "";
  } 
});

let reload=document.getElementById("reload")

reload.addEventListener("click",()=>{
  reload.style.color="green"
  location.reload()
})