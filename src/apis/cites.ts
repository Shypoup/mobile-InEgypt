import axios from 'axios';
import { baseURL } from '../constants/api';

export const fetchCites = (language) => {
    const response = axios.get(baseURL + 'city/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchCityDetails = (id, language) => {
    const response = axios.post(baseURL + 'selectcity/' + language, { id })
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}


export const fetchCityAttractions = (id, language) => {
    const response = axios.post(baseURL + 'selectattcity/' + language, { id })
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchCitySpots = (id, language) => {
    const response = axios.post(baseURL + 'selectspotcity/' + language, { id })
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchCityDestinations = (id, language) => {
    const response = axios.post(baseURL + 'citydis/' + language, { id })
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}