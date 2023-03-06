import { useState } from 'react';
import './App.css';

const api = {
  key: '263d5ab1c9b47f29a7aa5d2379157e44',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weather, setWeather] = useState([]);

  const dateBuilder = (d) => {
    let months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'jun',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
    let days = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetch(`${api.base}weather?q=${searchTerm}&units=metric&APPID=${api.key}`)
        .then((response) => response.json())
        .then((data) => setWeather(data));
        setSearchTerm('');
    }
  };

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <nav>
          <input
            type='text'
            className='search-bar'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleSearch}
          />
        </nav>
        {typeof weather.main != 'undefined' && (
          <>
            <section className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dateBuilder(new Date())}</div>
            </section>

            <section className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°c</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
