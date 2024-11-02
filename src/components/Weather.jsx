import React, { useEffect, useState } from "react";
import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
import UV from "./UV";
import RainPrediction from "./RainPredicion";
import WindSpeed from "./WindSpeed";
import Humidity from "./Humidity";
import Visibility from "./Visibility";
import AirQuality from "./AirQuality";
import Loading from "./Loading";
function Weather() {
  const [state, setState] = useState({
    city: "",
    weatherData: null,
    latitude: "",
    longitude: "",
    airQualityData: null,
    airQualityStatus: null,
    temprature: "",
    forcast: "",
    forcastDays: 7,
    useLocation: true,
    uvIndex: "",
    windSpeed: "",
    humidity: "",
    visibility: "",
    loading: false,
  });

  const fetchWeatherData = async function (lat, lon) {
    setState((prevState) => ({ ...prevState, loading: true })); // Set loading to true

    try {
      const query = lat && lon ? `${lat},${lon}` : state.city;

      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${query}&days=${state.forcastDays}&aqi=yes`
      );
      console.log(response.data.current);
      setState((prevState) => ({
        ...prevState,
        weatherData: response.data,
        airQualityData: response.data.current.air_quality,
        forcast: response.data.forecast.forecastday, // Assign forecast data here
        temprature: response.data.current.temp_c,
        uvIndex: response.data.current.uv,
        windSpeed: response.data.current.wind_kph, // Get wind speed
        humidity: response.data.current.humidity, // Get humidity
        visibility: response.data.current.vis_km, // Get visibility in km
        airQualityStatus: determineAirQuality(
          response.data.current.air_quality
        ),
      }));
    } catch (error) {
      console.error(error);
    } finally {
      setState((prevState) => ({ ...prevState, loading: false })); // Set loading to false
    }
  };

  useEffect(() => {
    if (state.useLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setState((prevState) => ({
              ...prevState,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }));
            fetchWeatherData(
              position.coords.latitude,
              position.coords.longitude
            );
          },
          (error) => {
            setState((prevState) => ({
              ...prevState,
              useLocation: false,
            }));
          }
        );
      }
    }
  }, [state.useLocation]);

  const determineAirQuality = (airQuality) => {
    const aqi = airQuality.aqi;
    const co = airQuality.co; // Carbon monoxide
    const no2 = airQuality.no2; // Nitrogen dioxide
    const pm25 = airQuality.pm2_5; // PM2.5

    // Example logic to derive air quality status from multiple factors
    // You can replace these thresholds with appropriate values based on your needs
    if (pm25 <= 12) return pm25 + " " + "Good";
    if (pm25 <= 35) return pm25 + " " + "Moderate";
    if (pm25 <= 55) return pm25 + " " + "Unhealthy for sensitive groups";
    if (pm25 <= 150) return pm25 + " " + "Unhealthy";
    return pm25 + " " + "Hazardous";
  };
  const handleSubmit = function (e) {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, useLocation: false }));
    fetchWeatherData();
  };
  return (
    <div className="container h-screen flex flex-col md:flex-row font-roboto-condensed bg-[#f7f6f9]">
      <aside className="bg-white md:sticky md:top-0 md:h-screen w-full md:max-w-[35vw] md:min-w-[35vw] p-6 shadow-lg flex-shrink-0">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="text"
            placeholder="Search for a place"
            value={state.city}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                city: e.target.value,
              }))
            }
            className="w-full px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 placeholder-gray-500"
          />

          <button
            type="submit"
            className="px-6 py-2 w-full sm:w-auto rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-200 shadow-md transform hover:-translate-y-0.5 focus:outline-none"
          >
            Get
          </button>
        </form>
        {state.loading ? (
          <Loading /> // Show loading component while fetching data
        ) : (
          <div>{/* Your existing weather data display code */}</div>
        )}
        <label className="flex items-center space-x-2 mt-4 cursor-pointer">
          <input
            type="checkbox"
            checked={state.useLocation}
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                useLocation: !state.useLocation,
              }))
            }
            className="appearance-none w-4 h-4 border border-gray-300 rounded-md bg-white checked:bg-blue-500 checked:border-transparent focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200 cursor-pointer"
          />
          <span className="text-gray-700 font-medium">Use my location</span>
        </label>

        {state.weatherData && (
          <div className="mt-6 flex flex-col items-center text-center space-y-3">
            <img
              src={state.weatherData.current.condition.icon}
              alt={state.weatherData.current.condition.text}
              className="w-24 h-24"
            />
            <h2 className="text-7xl font-light">
              {Math.floor(state.temprature)}°C
            </h2>

            <p className="text-lg text-gray-600">
              {state.weatherData.current.condition.text}
            </p>

            <div className="bg-[#f7f6f9] px-4 py-2 rounded-lg mt-3 w-full text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                {state.weatherData.location.name}
              </h2>
            </div>
          </div>
        )}
      </aside>

      <main className="bg-[#f7f6f9] p-6 md:overflow-y-auto md:h-screen">
        {state.loading ? (
          <Loading /> // Show loading component while fetching data
        ) : (
          <div>{/* Your existing weather data display code */}</div>
        )}
        {state.forcast && (
          <div className="my-10 mx-auto max-w-4xl">
            <h3 className="text-xl font-medium text-center text-gray-800 mb-6">
              {state.forcastDays}-Day Forecast:
            </h3>
            <div className="flex gap-4 flex-wrap justify-center">
              {state.forcast.map((day) => (
                <div
                  key={day.date}
                  className="px-5 py-4 flex flex-col items-center rounded-lg bg-white shadow-md transition-transform transform hover:-translate-y-1"
                >
                  <h4 className="text-lg font-medium text-gray-700">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      weekday: "short",
                    })}
                  </h4>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="w-12 h-12 mt-2"
                  />
                  <p className="text-lg font-semibold text-gray-800">
                    {Math.floor(day.day.avgtemp_c)}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {state.forcast && (
          <div>
            {" "}
            <h3 className="text-xl font-medium text-gray-800 mb-6 text-center">
              Today's Highlights:
            </h3>
            <div className="flex flex-wrap gap-3 mx-auto justify-center ">
              <UV uv={state.uvIndex} />
              <RainPrediction
                chanceOfRain={
                  state.weatherData.forecast.forecastday[0].day
                    .daily_chance_of_rain
                }
                icon={
                  state.weatherData.forecast.forecastday[0].day.condition.icon
                }
              />
              <WindSpeed speed={state.windSpeed} unit="km/h" />
              <Humidity value={state.humidity} />
              <Visibility value={state.visibility} unit="km" />
              <AirQuality aqi={state.airQualityData["us-epa-index"]} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Weather;
