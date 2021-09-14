import React,{useState,useEffect} from 'react';
import axios from 'axios';

const Weather = () => {
    const [city,setCity]=useState(null);
    const [search,setSearch]=useState('Seoul');
    const [isLoading,setIsLoading]=useState(false);
    const API_KEY='63c555d416f3e4b1bc2f27e09fdd2b78';

        useEffect(async()=>{
            setIsLoading(true);
            const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`);
            setCity(response.data);
            setIsLoading(false);
        },[]);

        const getApi=async()=>{
            setIsLoading(true);
            try{
                const response= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`);
                setCity(response.data);
                console.log(city);
            
            } catch (error) {
                setCity('');
                console.log(error);
                alert('No city. Please try again.');
        }
        setIsLoading(false);
    }
    
        const handleSubmit=(e)=>{
            e.preventDefault();
                getApi();  
        }
      


    return ( 
        <div className="container">
            {isLoading&&<div>Loading...</div>}
            <div>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    required
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    />
                   <button>Submit</button>
                </form>
                {city?(
                <div>
                    <h2>{city.sys.country}-{city.name}</h2>
                    <img src= {`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`} width='75px'/>
                    <h1 style={{fontSize:"3rem"}}>{Math.floor(city.main.temp-273)}°C </h1>
                    <h2>{city.weather[0].description}</h2>
                    
                </div>)
                :((<p>No data</p>))}
                   
                
                   
                
            </div>
        </div>
     );
}


export default Weather;
