import React, { useState } from 'react';
import './Weather.css'



function WeatherInfo({
temperature = "20°C",conditions = "Ensoleillé",city = "Jakarta",date = "Wed, 07 Aug"}) {
  return (
    <div className="weather-info">
      <div className="location-date-container">
        <div className="location">
          <span className='material-symbols-outlined location-icon'>
            Location_on
          </span>
          <h4 className="country-txt">{city}</h4>
        </div>
        <h5 className="currnet-date-txt regular-txt">{date}</h5>
      </div>
    </div>
  );
}
function WeatherSummary(){
	return(
		<div className="Weather-summary-container">
		<img src="" alt="" />
		<div className="weather-summary-info">
			<h1 className="temp-txt">29</h1>
			<h3 className="condition-txt regular-txt" >Clouds</h3> 
		</div>
</div>
	);
	
}


function Weather() {<div className=""></div>
  const [city, setCity] = useState('');

  return (
    <div className="weather-container">
      <h1>Météo</h1>

      <WeatherInfo/>
		<WeatherSummary></WeatherSummary>
    </div>
  );
}

export default Weather;