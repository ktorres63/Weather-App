export async function getWeather(city) {
  const API_KEY = process.env.API_KEY;
  const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`)
  if(!response.ok){
    throw new error (`Error: ${response.statusText}`);
  }
  const data = await response.json();
  return data
}