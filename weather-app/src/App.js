import React, {Component} from 'react';
// import logo from './logo.svg';
import './App.css';
import News from './News'


// const APIfarenheit = 'http://api.openweathermap.org/data/2.5/weather?appid=8aaeebf56a4dc35ee2decc6b37901e0c&units=imperial&q='
// const APIcelsius = 'http://api.openweathermap.org/data/2.5/weather?appid=8aaeebf56a4dc35ee2decc6b37901e0c&units=metric&q='
// let query = 'Berkeley'

class App extends Component {
  constructor(props) {
    super(props)

    this.APIfarenheit = 'http://api.openweathermap.org/data/2.5/weather?appid=8aaeebf56a4dc35ee2decc6b37901e0c&units=imperial&q='
    this.APIcelsius = 'http://api.openweathermap.org/data/2.5/weather?appid=8aaeebf56a4dc35ee2decc6b37901e0c&units=metric&q='
    this.query = 'Sacramento'

    this.state = {
      detailPageActive: false,

      farenheit: true,
      celsius: false,
      value: '',

      data: null,
      temp: '',
      feelsLike: '',
      min: '',
      max: '',
      weather: '',
      pressure: '',
      humidity: '',
      wind: '',
      windDeg: '',
      clouds: '',
      rain: '',
      sunrise: '',
      sunset: '',

      isLoading: false,
    }
  }

  async fetchAPI() {
    this.setState( {isLoading: true} )

    let API;
    if (this.state.farenheit) {
      API = this.APIfarenheit
    } else if (this.state.celsius) {
      API = this.APIcelsius
    } else {
      API = this.APIfarenheit
    }

    try {
      const response = await fetch(API + this.query)
      const json = await response.json()
      this.setState({
        data: json, 
        temp: json.main.temp, 
        feelsLike: json.main.feels_like, 
        min: json.main.temp_min,
        max: json.main.temp_max,
        weather: json.weather[0].description,
        pressure: json.main.pressure,
        humidity: json.main.humidity,
        wind: json.wind.speed,
        windDeg: json.wind.deg, 
        clouds: json.clouds.all,
        sunrise: json.sys.sunrise,
        sunset: json.sys.sunset,
        isLoading: false,
        detailPageActive: !this.state.detailPageActive
      })
    } catch (error) {
      console.log(error)
      this.setState(
        { isLoading: false, detailPageActive: false}
      )
      // alert('Invalid City!')
    }
  }

  componentDidMount() {
    this.fetchAPI()
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
    // console.log(event.target.value)
  }

  handleRadio = () => {
    // query = this.state.value
    // let API   
    // if (this.state.farenheit) {
    //   API = APIfarenheit
    // } else if (this.state.celsius) {
    //   API = APIcelsius
    // } else {
    //   API = APIfarenheit
    // }

    this.setState(
      {
        farenheit: !this.state.farenheit,
        celsius: !this.state.celsius
      }
    )

    // fetch(API + query)
    //   .then(response => response.json())
    //   .then(data => this.setState({
    //     data: data, 
    //     temp: data.main.temp, 
    //     feelsLike: data.main.feels_like, 
    //     min: data.main.temp_min,
    //     max: data.main.temp_max,
    //     weather: data.weather[0].description,
    //     pressure: data.main.pressure,
    //     humidity: data.main.humidity,
    //     wind: data.wind.speed,
    //     windDeg: data.wind.deg, 
    //     clouds: data.clouds.all,
    //     // rain: data.rain.3h,
    //     isLoading:false
    //   }))
  }

  handleSubmit = (event) => {
    this.query = this.state.value
    this.fetchAPI()
    // this.setState(
    //   { detailPageActive: !this.state.detailPageActive }
    // )
    event.preventDefault()
  }

  closeWeather = () => {
    this.setState(
      {detailPageActive : false}
    )
  }

  convertUnix = (time) => {
    let date = new Date(time * 1000)

    let hours = date.getHours();
    if (hours > 12) {
      hours = date.getHours() - 12;
    } else {
      hours = date.getHours();
    }
    
    let minutes = "0" + date.getMinutes();
    let formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime
  }

  render() {
    // if (this.state.isLoading) {
    //   return (
    //     <div id='loading-page'>
    //       <h1>Loading...</h1>
    //     </div>
    //   )
    // }
    // console.log(this.state.data)

    return (
      <div>
        <div id='search-form'>
          <div id='hello-message'>
            <h1>{this.state.detailPageActive ? `Hello, here is today's weather for ${this.query}` : "Hello! Search your city's weather below"}</h1>
          </div>
          <div id='search-elements'>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input type='text' value={this.state.value} onChange={this.handleChange} onClick={this.closeWeather} id='search' placeholder='Search by city or zip code' className={this.state.detailPageActive ? 'min' : 'regular'} />
              </div>
              <div id='temp-type' style={this.state.detailPageActive ? {opacity: 0} : {opacity: 100 }}>
                <label id='farenheit' className='temp-radio' style={this.state.farenheit ? {background: 'rgb(0, 169, 224)', color:'white'} : {background: 'none'}}>
                  <input 
                    type='radio'
                    value={this.state.farenheit} 
                    checked={this.state.farenheit === true}
                    name='temp-type'
                    onChange={this.handleRadio} />
                    Farenheit
                </label>
                <label id='celsius' className='temp-radio' style={this.state.celsius ? {background: 'rgb(0, 169, 224)', color:'white'} : {background: 'none'}}>
                  <input 
                      type='radio'
                      value={this.state.celsius} 
                      checked={this.state.celsius === true}
                      name='temp-type' 
                      onChange={this.handleRadio} />
                      Celsius
                </label>
              </div>
              <div id='search-button'>
                <button id='submit-search' style={ this.state.detailPageActive ? {opacity: 0} : {opacity: 100 }}>Search</button>
              </div>
            </form>
          </div>
        </div>
        <div id='weather-detail' className = {this.state.detailPageActive ? 'show' : 'hidden'}>
          <div id='current-temp'>
            <div id='current'>
              <div id='min-temp'>
                <p id='min-temp-num'>{Math.round(this.state.min)}&#xb0;{this.state.celsius ? 'C' : 'F'}</p>
                <p id='min-temp-label'>Today's Min</p>
              </div>
              <div id='main-temp'>
                <p id='big-temp-label'>Current Temp</p>
                <h1 id='big-temp'>{Math.round(this.state.temp)}&#xb0;{this.state.celsius ? 'C' : 'F'}</h1>
                <p id='feels-like'>Feels Like: {Math.round(this.state.feelsLike)}&#xb0;{this.state.celsius ? 'C' : 'F'}</p>
              </div>
              <div id='max-temp'>
                <p id='max-temp-num'>{Math.round(this.state.max)}&#xb0;{this.state.celsius ? 'C' : 'F'}</p>
                <p id='max-temp-label'>Today's Max</p>
              </div>

              {/* <p id='big-temp-label'>Current Temp</p>
              <h1 id='big-temp'>{Math.round(this.state.temp)}&#xb0;{this.state.celsius ? 'C' : 'F'}</h1>
              <p id='feels-like'>Feels Like: {Math.round(this.state.feelsLike)}&#xb0;{this.state.celsius ? 'C' : 'F'}</p> */}
            </div>
            {/* <div id='current-temp-details'> */}
              {/* <div id='min-temp'>
                <p>{Math.round(this.state.min)}&#xb0;{this.state.celsius ? 'C' : 'F'}</p>
                <p>Today's Min</p>
              </div> */}
              {/* <div id='max-temp'>
                <p>{Math.round(this.state.max)}&#xb0;{this.state.celsius ? 'C' : 'F'}</p>
                <p>Today's Max</p>
              </div> */}
            {/* </div> */}
            <div id='current-temp-sun'>
              <div id='sunrise'>
                <p>Sunrise Icon</p>
                <p>{this.convertUnix(this.state.sunrise)} AM</p>
                <p>Sunrise</p>
              </div>
              <div id='sunset'>
                <p>Sunset Icon</p>
                <p>{this.convertUnix(this.state.sunset)} PM</p>
                <p>Sunset</p>
              </div>
            </div>
            <div id='current-temp-extra'>
              <div id='weather'>
                <p>{this.state.weather}</p>
                <p>Today's Weather</p>
              </div>
              <div id='humidity'>
                <p>{this.state.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div id='wind-speed'>
                <p>{this.state.wind} {this.state.celsius ? 'km/h' : 'mp/h'}</p>
                <p>Wind Speed</p>
              </div>
              <div id='cloud-cov'>
                <p>{this.state.clouds}%</p>
                <p>Cloud Coverage</p>
              </div>
            </div>

          </div>
          <div id='news-events'>
            <News />
          </div>
        </div>
      </div>
    )
  }
}

export default App;