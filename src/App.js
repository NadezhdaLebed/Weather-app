import React from "react";
import moment from 'moment';
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "7c5630dd2df6d28ebb31b7fe4efc3329";

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined 
  }

  
  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if(city) {
      const api_url = await 
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const data = await api_url.json();

      var sunset = data.sys.sunset;
      var date = moment(sunset).add(12, 'hours').format('HH:mm:ss');

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: date,
        error: undefined
      })
      } else {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          pressure: undefined,
          sunset: undefined,
          error: "Введите название города"
      })
    }
  }

  render () {
    const { temp, city, country, pressure, sunset, error } = this.state;

    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row"> 
              <div className="col-sm-5 info">
                <Info />
              </div>
              <div className="col-sm-7 form">
              <Form  weatherMethod={this.gettingWeather} />
              <Weather 
                temp={temp}
                city={city}
                country={country}
                pressure={pressure}
                sunset={sunset}
                error={error}
              />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;