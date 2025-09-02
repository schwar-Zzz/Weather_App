import React from "react";

interface ForecastProps {
  data: any[];
}

const ForecastCard = ({ data }: ForecastProps) => {
  return (
      <div>
        <h2 className="text-2xl font-semibold my-5 text-center ">10-Day Forecast</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          {data.slice(0, 10).map((day, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-32 bg-white/10 p-4 rounded-xl shadow-md text-center"
            >
              <p className="font-bold">Day {i + 1}</p>
              <img  
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto w-12 h-12"
              />
              <p className="text-lg">{Math.round(day.main.temp)}°C</p>
              <p>{day.weather[0].main}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default React.memo(ForecastCard);
