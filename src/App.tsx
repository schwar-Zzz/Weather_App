import { useEffect, useState } from 'react';
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastCard from './components/ForecastCard';
import Feedback from './components/Feedback';

const api={
  key: '39c987324f3952eee48293b92baeb36b',
  base: 'https://api.openweathermap.org/data/2.5/',
}

function App() {
  const [city, setCity] = useState(localStorage.getItem("lastCity") || "tokyo");
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

const handleSearch = (city: string) => {
  setCity(city);
  localStorage.setItem("lastCity", city);
  setError(null); 
}

useEffect(() => {
  if (!city) return;

  const fetchWeather = async (city: string) => {
    try {
      // Current weather
      const resWeather = await fetch(
        `${api.base}weather?q=${city}&units=metric&appid=${api.key}`
      );
      const weatherData = await resWeather.json();

      if (weatherData.cod !== 200) {
        throw new Error("City not found");
      }
      setWeather(weatherData);

      // Forecast
      const resForecast = await fetch(
        `${api.base}forecast?q=${city}&units=metric&appid=${api.key}`
      );
      const forecastData = await resForecast.json();

      if (forecastData.cod !== "200") {
        throw new Error("City not found");
      }
      setForecast(forecastData.list);
      setError(null); // new habit clear any previous errors
      console.log(weatherData);
      console.log(forecastData);
    } catch (err: any) {
      console.error(err.message);
      setWeather({});
      setForecast([]);
      setError(err.message);
    }
  };

  fetchWeather(city);
}, [city]);



  return (
    <div className=' relative w-full h-screen p-0 sm:p-5 bg-linear-to-t from-sky-500 to-indigo-500 text-white '>
      <Feedback  showForm={showForm} setShowForm={setShowForm}  />
      <button onClick={()=>setShowForm(true)} className='absolute bottom-0 right-0 m-5 px-4 py-2 bg-indigo-300 hover:bg-indigo-400 rounded-xl shadow-md transition text-white '>Tell us what you think</button>
      <header className='flex flex-col items-center justify-center'>
        <h1 className='text-4xl font-bold'>Weather App</h1>
        <SearchBar onSearch={handleSearch}/>
      </header>
      <main className=' items-center justify-center space-between max-w-3xl mx-auto mt-6'>
        {/* to do => creat an error componenet */}
        {error && <div className="text-red-500 text-2xl font-semibold my-5 text-center">{error}</div>} 

        <div className=''>
          {(weather as any).main && <WeatherCard data={weather}/>}
          {(forecast.length > 0) && <ForecastCard data={forecast}/>}
        </div>
      </main>
    </div>
  )
}

export default App


