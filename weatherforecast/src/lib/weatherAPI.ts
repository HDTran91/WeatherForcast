export async function fetchWeather(city: string, unit: 'metric' | 'imperial') {
  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);

  if (!response.ok) {
    throw new Error('Weather fetch failed');
  }

  return await response.json();
}