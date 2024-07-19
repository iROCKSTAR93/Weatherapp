import React, { useEffect, useRef, useState } from 'react'
import './App.css'
const App = () => {
   
  const [data,setData]=useState(false);
  const [city,setCity]=useState("London");

  useEffect(()=>{
    fetch(`http://api.weatherapi.com/v1/current.json?key=afb18d159f8b4c9289f165922241907&q=${city}`).then((result)=>{
      result.json().then((res)=>{
        console.log(res);
        setData({
          humidity: res.current.humidity,
          temperature: res.current.temp_c,
          city: res.location.name,
          windspeed: res.current.wind_kph,
          country: res.location.country,
          feelslike:res.current.feelslike_c,
          windirection:res.current.wind_dir
        })
      })
     })
  },[city])
  const inputRef=useRef();
  const fun=(value)=>{
     if(!value) alert("empty city name");
     else
     setCity(value);
  }
  return (
    <div className='main-div'>
      <div className='upper-part'>
          <input ref={inputRef} type="text" placeholder='London'/>
          <button onClick={()=>{fun(inputRef.current.value)}} > search</button>
      </div>
      <div className='lower-div'>
        <h1>{data.city}, {data.country}</h1>
        <h2>Temperature : {data.temperature} deg C</h2>
        <h2>Feels like : {data.feelslike} deg C</h2>
        <h2>Humidity : {data.humidity}</h2>
         <h2>Wind speed : {data.windspeed} kmph</h2>
         <h2>Wind Direction : {data.windirection}</h2>
      </div>
      
    </div>
  )
}

export default App
