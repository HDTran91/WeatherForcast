/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import CityInput from '@/components/CityInput';
import WeatherDisplay from '@/components/WeatherDisplay';
import Spinner from '@/components/Spinner';
import { fetchWeather } from '@/lib/weatherAPI';
import Image from 'next/image';

export default function Home() {
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState<string | null>(null);
  const [showWeather, setShowWeather] = useState(false);

  useEffect(() => {
    const fav = localStorage.getItem('favoriteCity');
    if (fav) {
      setCity(fav);
    }
  }, []);

  const handleSearch = async (cityName: string, tempUnit: 'metric' | 'imperial') => {
    setLoading(true);
    try {
      const data = await fetchWeather(cityName, tempUnit);
      setWeatherData(data);
      setShowWeather(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Could not fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = () => {
    if (city) {
      localStorage.setItem('favoriteCity', city);
      setFavorite(city);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setShowWeather(false);
    }
  };

  return (

    <main className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-6">
      {!showWeather && (
        <><h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-500 text-center animate-fadeUp mb-8 flex justify-center items-center gap-2">
          <span>🌤️</span> WeatherCloud
        </h1><div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto animate-fadeUp">
            <h2 className="text-xl font-semibold mb-2 text-center">Enter City and Unit</h2>
            <CityInput
              city={city}
              setCity={setCity}
              unit={unit}
              setUnit={setUnit}
              onSearch={() => handleSearch(city, unit)} />
          </div>
           <div className="mt-6 flex justify-center flex-wrap gap-4">
            {['sun', 'cloud', 'rain', 'storm', 'snow', 'wind'].map((name, index) => (
              <Image
                key={index}
                src={`/icons/${name}.png`}
                alt={name}
                width={150}
                height={150}
                className="opacity-70 hover:opacity-100 transition"
              />
            ))}
          </div>

          <div className="mt-4 text-center text-white text-lg font-medium min-h-[30px]">
            <span className="animate-typing inline-block whitespace-nowrap overflow-hidden border-r-2 border-white pr-2">
              Sun or Storm — We have got your forecast.
            </span>
          </div>

        </>

      )}

    {loading && <Spinner />}

    {!loading && weatherData && showWeather && (
    <div
    className="animate-fadeUp transition-opacity duration-700 opacity-100 mt-6 flex justify-center"
    onClick={handleBackgroundClick}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <WeatherDisplay
        data={weatherData}
        unit={unit}
        onToggleUnit={() => {
          const newUnit = unit === 'metric' ? 'imperial' : 'metric';
          setUnit(newUnit);
          handleSearch(city, newUnit);
        }}
        onSaveFavorite={handleFavorite}
        isFavorite={favorite === city}
      />
      </div>
    </div>
  )}

    </main>
  );
}