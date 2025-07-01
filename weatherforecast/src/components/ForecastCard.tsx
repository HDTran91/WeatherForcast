/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Image from 'next/image';

export default function ForecastCard({ data, unit }: { data: any; unit: 'metric' | 'imperial' }) {
  const date = new Date(data.dt * 1000).toLocaleDateString();
  return (
    <div className="bg-white/20 backdrop-blur-md p-2 rounded text-center text-white shadow-md">
        <p className="text-sm">{date.split('/').slice(0, 2).join('/')}</p>
        <Image
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt="Weather Icon"
            width={40}
            height={40}
        />
        <p className="font-semibold">{Math.round(data.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
    </div>

  );
}
