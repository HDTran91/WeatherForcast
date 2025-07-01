import React from 'react';

interface Props {
  city: string;
  setCity: (val: string) => void;
  unit: 'metric' | 'imperial';
  setUnit: (val: 'metric' | 'imperial') => void;
  onSearch: () => void;
}

export default function CityInput({ city, setCity, unit, setUnit, onSearch }: Props) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-4">
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
        className="p-2 rounded shadow border border-gray-300"
        onKeyDown={e => e.key === 'Enter' && onSearch()}
      />

      <div className="flex items-center gap-2">
        <label>
          <input
            type="radio"
            checked={unit === 'metric'}
            onChange={() => setUnit('metric')}
          /> °C
        </label>
        <label>
          <input
            type="radio"
            checked={unit === 'imperial'}
            onChange={() => setUnit('imperial')}
          /> °F
        </label>
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
        onClick={onSearch}
      >
        Get Weather
      </button>
    </div>
  );
}