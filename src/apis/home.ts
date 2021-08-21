import axios from 'axios';
import { baseURL } from '../constants/api';

export const fetchAds = (language) => {
    const response = axios.get(baseURL + 'ads/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchRecommendedAttractions = (language) => {
    const response = axios.get(baseURL + 'recommendattraction/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}


export const fetchTrendySpots = (language) => {
    const response = axios.get(baseURL + 'recommendspot/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}


export const fetchTopCites = (language) => {
    const response = axios.get(baseURL + 'recommendcity/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchTopCategories = (language) => {
    const response = axios.get(baseURL + 'recommendcategory/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}