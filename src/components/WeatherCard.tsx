interface WeatherCardProps {
    data: any;
}

const WeatherCard = ({data}:WeatherCardProps) => {
  if (!data.main || !data.weather) {
    return <div>Weather data not available.</div>;
  }

  return (
     <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-semibold">{data.name}</h2>
        <p className="text-4xl font-bold">{Math.round(data.main.temp)}°C</p>
        <img
          src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
          className="mx-auto"
        />
        <p className="capitalize">{data.weather[0].description}</p>
    </div>
  )
}

export default WeatherCard