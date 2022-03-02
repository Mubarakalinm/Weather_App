import './App.css';
import React from 'react';
import Weather from './app_components/weather.component';
import Form from './app_components/form.component';

const Api_Key="1555fd4b3750421e69284ec0ec8ab7e2";


class App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined, 
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false

    };
    this.weathericon={
      Thunderstorm:"wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    }
  }
  calCelsius(temp){
    let cell=Math.floor(temp-273.15)
    return cell;
  }
  getWeatherIcon(icon, rangeID){
    switch(true){
      case rangeID>=200&&rangeID<=232:
        this.setState({icon:this.weathericon.Thunderstorm});
        break;
      case rangeID>=300&&rangeID<=321:
        this.setState({icon:this.weathericon.Drizzle});
        break;

      case rangeID>=500&&rangeID<=531:
        this.setState({icon:this.weathericon.Rain});
        break;

      case rangeID>=600&&rangeID<=622:
        this.setState({icon:this.weathericon.Snow});
        break;

      case rangeID>=700&&rangeID<=781:
        this.setState({icon:this.weathericon.Atmosphere});
        break;

      case rangeID===800:
        this.setState({icon:this.weathericon.Clear});
        break;
        case rangeID>=801&&rangeID<=804:
          this.setState({icon:this.weathericon.Clouds});
        break;
        default:
          this.setState({icon:this.weathericon.Clouds});

    }
  }


  getWeather=async(e)=>{
    e.preventDefault();
    
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;

   if(city&&country){
    const api_call= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`)
    const response=await api_call.json();
    this.setState({
      city:`${response.name},${response.sys.country}`,
      celsius:this.calCelsius(response.main.temp),
      temp_max:this.calCelsius(response.main.temp_max),
      temp_min:this.calCelsius(response.main.temp_min),
      description:response.weather[0].description,
      error:false

    })
  this.getWeatherIcon(this.weathericon,response.weather[0].id)

   }else{
     this.setState({error:true})
   }
}
   
  render(){
    return (<div>
      <Form loadweather={this.getWeather} error={this.state.error}/>
      <Weather city={this.state.city} 
      country={this.state.country}
      celsius={this.state.celsius}
      temp_max={this.state.temp_max}
      temp_min={this.state.temp_min}
      description={this.state.description}
      icon={this.state.icon}
        />
    </div>)
  }

}

export default App;
