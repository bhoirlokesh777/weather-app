function weatherDetail(props){
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat']
    const todayDate = new Date();
    return (
        <div>
            <h2>Details of {props.state.selectedCity.name}, {props.state.selectedCity.sys.country}</h2>
            <div className="current-temp">
                <div><img className="wob_tci" alt="Clear with periodic clouds" src="//ssl.gstatic.com/onebox/weather/64/sunny_s_cloudy.png" id="wob_tci" data-atf="1" data-frt="0"/></div>
                <div>
                    <div>
                        <span className="orange-text">{`${days[todayDate.getDay()]}, ${months[todayDate.getMonth()]} ${todayDate.getDate()}, ${todayDate.getHours()}:${todayDate.getMinutes()}`}</span>
                    </div>
                    <div>Temprature :  <span className="heading">{Math.round(props.state.selectedCityWeather.current.temp)}°{props.state.selectedTempType === "metric" ? 'C' : 'F'}</span></div>
                    <div>Humidity :  <span className="heading">{props.state.selectedCityWeather.current.humidity}%</span></div>
                    <div>Wind :  <span className="heading">{props.state.selectedCityWeather.current.wind_speed}km/h</span></div>
                </div>
            </div>
        </div>
    );
}
export default weatherDetail