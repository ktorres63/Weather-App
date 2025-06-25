import './style.css'; 
import { getWeather } from './api.js';

console.log("helloo from console");
const weather = await getWeather('Arequipa');
console.log(`${weather.location.name}: ${weather.current.temp_c}°C`)