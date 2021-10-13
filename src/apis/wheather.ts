import axios from 'axios';

export const fetchTemperature = (longitude,latitude) => {
    const response = axios.get(`https://api.weatherapi.com/v1/current.json?key=1ce7b855c9a548a185693957211310&q=${longitude},${latitude}` )
        .then((response) => {
            
            return Math.round( response.data.current.temp_c);

        }).catch((error) => {

        })
    return response
}