import react from 'react';
import axios from 'axios';


function searchBox(props){
    const [inputVal, setInputVal] = react.useState('');
    const [searchCityData, setSearchCityData] = react.useState([]);
    const searchCityChange = (e) => {
        setInputVal(e.target.value);
    }
    const [searchResult, setsearchResult] = react.useState(false);
    const citySearchClick = () => {
        if(inputVal !== '') {
            setsearchResult(false);
            axios.get(`${process.env.REACT_APP_BASE_URL}/find`, {
                params: {
                    q: inputVal,
                    appid: process.env.REACT_APP_API_KEY
                }
            })
            .then(function (response) {
                if(response.status === 200) {
                    setSearchCityData(response.data)
                    if(response.data.list.length == 0){
                        setsearchResult(true);
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }

    const addCityClick = (item) => {
        let temp = props.state.cityList.filter((element) =>  {
            return element.name === item.name && element.sys.country === item.sys.country
        })
        if(temp.length > 0) {
            alert('This city is already present in the list');
        } else {
            props.setState((prevState) => ({
                ...prevState,
                cityList: [...prevState.cityList, item]
            }))
            setSearchCityData([])
            setInputVal('')
        }
    }
    return(
        <div>
            <div className="form-group">
                <div className='input-group'>
                    <label>Search city:</label>
                    <input type="text" name="city" id="city" onChange={searchCityChange} value={inputVal}/>
                    <button className='button' onClick={citySearchClick}>Search</button>
                </div>
                
            </div>
            <div className='suggestedList'>
                {searchResult && 
                    <h5 className='m-0'>No result found</h5>
                }
                <h5 className='m-0'>{searchCityData.list && searchCityData.list.length > 0 ? "Search result" : ""}</h5>
                {searchCityData.list && searchCityData.list.length > 0 ? 
                    searchCityData.list.map((item, index) => {
                        return (
                            <div className='suggested_city_list'>
                                <div key={index} value={item.name}>{item.name+","+item.sys.country}</div> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <a href='javascript:void(0)'  onClick={() => addCityClick(item)}>Add city to the list</a>
                            </div>
                        )
                    }) : null
                }
            </div> 
        </div>
    )
}
export default searchBox