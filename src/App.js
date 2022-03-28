import react, { useEffect, useState } from 'react';
import './App.css';
import SearchBox from './Components/searchBox'
import Listing from './Components/Listing'
import WeatherDetail from './Components/weatherDetail'
import axios from 'axios';
function App() {
  const [state, setState] = useState({
    selectedCity: '',
    selectedCityWeather: {},
    selectedTempType: 'metric',
    cityList: [
      {
          "id": 1260730,
          "name": "Pālghar",
          "coord": {
              "lat": 19.6833,
              "lon": 72.75
          },
          "main": {
              "temp": 300.24,
              "feels_like": 301.66,
              "temp_min": 300.24,
              "temp_max": 300.24,
              "pressure": 1011,
              "humidity": 64,
              "sea_level": 1011,
              "grnd_level": 1010
          },
          "dt": 1648228147,
          "wind": {
              "speed": 2.46,
              "deg": 199
          },
          "sys": {
              "country": "IN"
          },
          "rain": null,
          "snow": null,
          "clouds": {
              "all": 90
          },
          "weather": [
              {
                  "id": 804,
                  "main": "Clouds",
                  "description": "overcast clouds",
                  "icon": "04n"
              }
          ]
      },
      {
          "id": 1254661,
          "name": "Thāne",
          "coord": {
              "lat": 19.2,
              "lon": 72.9667
          },
          "main": {
              "temp": 302.1,
              "feels_like": 304.25,
              "temp_min": 302.1,
              "temp_max": 302.1,
              "pressure": 1010,
              "humidity": 61
          },
          "dt": 1648228146,
          "wind": {
              "speed": 2.06,
              "deg": 200
          },
          "sys": {
              "country": "IN"
          },
          "rain": null,
          "snow": null,
          "clouds": {
              "all": 20
          },
          "weather": [
              {
                  "id": 711,
                  "main": "Smoke",
                  "description": "smoke",
                  "icon": "50n"
              }
          ]
      },
      {
          "id": 1275339,
          "name": "Mumbai",
          "coord": {
              "lat": 19.0144,
              "lon": 72.8479
          },
          "main": {
              "temp": 302.14,
              "feels_like": 304.32,
              "temp_min": 302.14,
              "temp_max": 302.14,
              "pressure": 1010,
              "humidity": 61
          },
          "dt": 1648228148,
          "wind": {
              "speed": 2.06,
              "deg": 200
          },
          "sys": {
              "country": "IN"
          },
          "rain": null,
          "snow": null,
          "clouds": {
              "all": 20
          },
          "weather": [
              {
                  "id": 711,
                  "main": "Smoke",
                  "description": "smoke",
                  "icon": "50n"
              }
          ]
      },
      {
          "id": 1271157,
          "name": "Goa",
          "coord": {
              "lat": 15.3333,
              "lon": 74.0833
          },
          "main": {
              "temp": 301.36,
              "feels_like": 306.65,
              "temp_min": 301.36,
              "temp_max": 301.36,
              "pressure": 1012,
              "humidity": 85,
              "sea_level": 1012,
              "grnd_level": 998
          },
          "dt": 1648227920,
          "wind": {
              "speed": 0.96,
              "deg": 320
          },
          "sys": {
              "country": "IN"
          },
          "rain": {
              "1h": 0.24
          },
          "snow": null,
          "clouds": {
              "all": 99
          },
          "weather": [
              {
                  "id": 500,
                  "main": "Rain",
                  "description": "light rain",
                  "icon": "10n"
              }
          ]
      }
    ],
  })
  const showCityWeatherFn = (city) => {
    setState((prevState) => ({
        ...prevState,
        selectedCity: city
    }))
    getWeatherData(city);
  }

  const deleteCityFn = (index, city) => {
      let tempList = state.cityList;
      console.log(tempList);
      tempList.splice(index, 1);
      setState((prevState) => ({
          ...prevState,
          cityList: tempList
      }))
  }

  const getWeatherData = (cityDetails) => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/onecall`, {
        params: {
            lat: cityDetails.coord.lat,
            lon: cityDetails.coord.lon,
            units: state.selectedTempType,
            appid: process.env.REACT_APP_API_KEY
        }
      })
      .then(function (response) {
        console.log(response);
        if(response.status === 200) {
            setState((prevState) => ({
                ...prevState,
                selectedCityWeather: response.data
            }))
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  useEffect(() => {
    getWeatherData(state.cityList[0]);
    setState((prevState) => ({
      ...prevState,
      selectedCity: state.cityList[0]
    }))
  }, [])
  return (
    // <searchBox/>
    <div className='app-container'>
      <SearchBox state={state} setState={setState} />
      <div className='app-sub-container'>
        {Object.keys(state.cityList).length > 0 ?
          <div className='app-container-left'>
            <Listing 
                state={state} 
                showCityWeatherFn={showCityWeatherFn}
                deleteCityFn={deleteCityFn}
            />  
          </div>
         : null}
        {Object.keys(state.selectedCityWeather).length > 0 ?
          <div className='app-container-right'>
            <WeatherDetail state={state} />
          </div> 
        : null}
      </div>
    </div>
  );
}

export default App;
