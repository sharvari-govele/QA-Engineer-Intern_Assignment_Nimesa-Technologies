const axios = require("axios");

const url = "https://samples.openweathermap.org/data/2.5/forecast/hourly?q=London,us&appid=b6907d289e10d714a6e88b30761fae22";

function getWeather(date) {
  return axios.get(url)
    .then(response => {
      const data = response.data;
      for (const i of data.list) {
        if (i.dt_txt.startsWith(date)) {
          const temp = i.main.temp;
          const celsius = temp - 273.15;
          return {
            temperatureKelvin: temp,
            temperatureCelsius: celsius.toFixed(2)
          };
        }
      }
    });
}

function getWindSpeed(date) {
  return axios.get(url)
    .then(response => {
      const data = response.data;
      for (const i of data.list) {
        if (i.dt_txt.startsWith(date)) {
          return i.wind.speed;
        }
      }
    });
}

function getPressure(date) {
  return axios.get(url)
    .then(response => {
      const data = response.data;
      for (const i of data.list) {
        if (i.dt_txt.startsWith(date)) {
          return i.main.pressure;
        }
      }
    });
}

function main() {
  while (true) {
    console.log("\nselect 1 option from below:");
    console.log("1. Get weather");
    console.log("2. Get Wind Speed");
    console.log("3. Get Pressure");
    console.log("0. Exit");

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });

    readline.question("Enter your choice: ", async (choice) => {
      if (choice === "1") {
        const date = await getInput("Enter the date (YYYY-MM-DD): ");
        const weatherData = await getWeather(date);
        console.log(`The temperature on ${date} is ${weatherData.temperatureKelvin}°K and ${weatherData.temperatureCelsius}°C.`);
      } else if (choice === "2") {
        const date = await getInput("Enter the date (YYYY-MM-DD): ");
        const windSpeed = await getWindSpeed(date);
        console.log(`The wind speed on ${date} is ${windSpeed} m/s.`);
      } else if (choice === "3") {
        const date = await getInput("Enter the date (YYYY-MM-DD): ");
        const pressure = await getPressure(date);
        console.log(`The pressure on ${date} is ${pressure} hPa.`);
      } else if (choice === "0") {
        console.log("Exiting the program.");
        process.exit();
      } else {
        console.log("Select appropriate option");
      }

      readline.close();
    });
  }
}

function getInput(prompt) {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    readline.question(prompt, (input) => {
      resolve(input);
      readline.close();
    });
  });
}

main();
