
import React from 'react';
import {Alert} from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";
import axios from "axios";
import Weather from "./Weather";

const WEATHER_API_KEY = "d6a96eabc63fd1604a487ed52ec35088";
export default class extends React.Component {
  state = {
    isLoading : true
  }; 

  getWeather = async (latitude, longitude) => {
    const { 
            data: {
              main: { temp },
              weather
          } 
        } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${WEATHER_API_KEY}&units=metric`
    );
    //console.log(data);
    
    this.setState({
      isLoading: false,
      condition: weather[0].main, 
      temp
    });
  };

  getLocation=async()=>{
    try{
      await Location.requestForegroundPermissionsAsync(); 
      await Location.requestBackgroundPermissionsAsync();
      
      const {
        coords: { latitude, longitude }
      } = await Location.getCurrentPositionAsync();
      //console.log(coords);
      this.getWeather(latitude,longitude);
      
    }catch(error){
      console.log(coords);
      console.log("아니 시벌?")
      Alert.alert("Can`t find you.", "So bad");
    }
  }
  componentDidMount(){
    this.getLocation();
  }
  
  
  render(){   
    const {isLoading,temp,condition} = this.state;
    return isLoading ? <Loading/>: <Weather temp={temp} condition={condition} />;
  } 
}
//flex : 화면에서 차지하고싶은 크기. 1은 전부. 
//형제 컴포넌트가 있다면 둘 사이의 비율을 나타냄.
