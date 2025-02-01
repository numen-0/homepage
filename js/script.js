function genRandomNumberGenerator(min, max) {
    return () => Math.random() * (max - min) + min;
}

class Typewriter {
    constructor(text, destinationId, caretId, speed) {
        this.destination = document.getElementById(destinationId);
        this.caret = caretId ? document.getElementById(caretId) : null;
        this.text = text;
        this.textPos = 0;
        this.contents = "";
        this.getRandomNumber = genRandomNumberGenerator(45 / speed, 150 / speed);
    }

    write() {
        this.contents = " ";
        this.destination.innerHTML = this.contents + this.text.substring(0, this.textPos);

        if (this.textPos++ < this.text.length) {
            setTimeout(() => this.write(), this.getRandomNumber());
        } else {
            if (this.caret) this.caret.style.opacity = "0";
        }
    }
}

// time
const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

function getTime() {
    const now = new Date();
    const month = months[now.getMonth()];
    const day = now.getDate();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    const textContent = `${month} ${day}, ${hours}:${minutes}`;
    return textContent;
}
function updateTime() {
    const timerBox = document.getElementById("time-box");
    if (!timerBox) return;
    timerBox.textContent = getTime();
}
let tw_time = new Typewriter(getTime(), "time-box", null, 0.65);

// weather
let tw_weather;
async function fetchWeather(location) {
    const url = `https://wttr.in/${location}?0qAT&lang=en`;
    // console.log(url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const asciiArt = await response.text();
        // console.log(asciiArt);

        tw_weather = new Typewriter(asciiArt, "weather-box", null, 6);
        tw_weather.write();
        // document.getElementById('weather-box').textContent = asciiArt;
    } catch (error) {
        console.error(`Failed to fetch weather data: ${error.message}`);
    }
}

// title
let tw_title = new Typewriter("/home/numen", "tittle", "tittle_caret", 1);

// on load
document.addEventListener('DOMContentLoaded', function () {
    setInterval(() => updateTime, 10000);
    tw_time.write();
    fetchWeather("Bilbao");
    tw_title.write();
});