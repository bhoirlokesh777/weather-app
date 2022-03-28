function Listing(props){
    return(
        <div>
            <h2>{props.state.cityList && props.state.cityList.length > 0 ? "City List" : "Search for your city"}</h2>
            <>
                {props.state.cityList && props.state.cityList.length > 0 &&
                    <div className="cityList">
                        <span className="sr-no bold-600">Sr no.</span>
                        <span className="cityName bold-600">City Name</span>
                        <span className="bold-600">Action</span>
                    </div>
                }
            </>
            {props.state.cityList && props.state.cityList.length > 0 &&
            props.state.cityList.map((item, index) => {
                return (
                    <div className="cityList" key={index}>
                        <span className="sr-no">{index+1}</span>
                        <span className="cityName">{item.name}</span>
                        <span><span className="showDetail" onClick={() => props.showCityWeatherFn(item)}>Show details</span> / <span className="deletBtn" onClick={() => props.deleteCityFn(index, item)}>Remove</span></span>
                    </div>
                )
            })}
        </div>
    )
}
export default Listing