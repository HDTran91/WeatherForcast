/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ForecastCard from './ForecastCard';
import Image from 'next/image';

interface Props {
  data: any;
  unit: 'metric' | 'imperial';
  onToggleUnit: () => void;
  onSaveFavorite: () => void;
  isFavorite: boolean;
}

export default function WeatherDisplay({ data, unit, onToggleUnit, onSaveFavorite, isFavorite }: Props) {
  const current = data.list[0];
  const dailyForecast = data.list.filter((_: any, idx: number) => idx % 8 === 0).slice(0, 5);

  return (
    <div className="animate-fadeScale bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-lg text-white shadow-xl text-center">
        <h1 className="text-3xl font-semibold">{data.city.name}</h1>

        <div className="flex justify-center items-center mt-2">
            <Image
            src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            width={100}
            height={100}
            />
        </div>

        <div className="text-5xl font-bold">{current.main.temp}°{unit === 'metric' ? 'C' : 'F'}</div>

        <p className="text-lg mt-1 capitalize">{current.weather[0].description}</p>

        <p className="text-sm mt-1">
            {current.main.temp_min}° / {current.main.temp_max}°
        </p>

        <div className="mt-4 space-x-4">
            <button className="underline" onClick={onToggleUnit}>
            Switch to {unit === 'metric' ? '°F' : '°C'}
            </button>
            <button onClick={onSaveFavorite}>
            {isFavorite ? '★ Favorite' : '☆ Save as Favorite'}
            </button>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-2">
            {dailyForecast.map((item: any, i: number) => (
            <ForecastCard key={i} data={item} unit={unit} />
            ))}
        </div>
    </div>

  );
}