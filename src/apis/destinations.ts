import axios from 'axios';
import { baseURL } from '../constants/api';

export const fetchAttractions = (language) => {
    const response = axios.get(baseURL + 'destination/attraction/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}


export const fetchSpots = (language) => {
    const response = axios.get(baseURL + '/destination/spot/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}


export const searchDestination = (search, language) => {
    const response = axios.get(baseURL + 'search/' + language + '?search=' + search, {

    })
        .then((response) => {


            return response.data.data.result

        }).catch((error) => {

        })
    return response
}

export const fetchDestinationDetails = (id, language) => {
    const response = axios.post(baseURL + 'deatils/' + language, { id }, {
        headers: {
            token: "m35"
        }

    })
        .then((response) => {


            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchReviews = (id) => {
    const response = axios.post(baseURL + 'showreview', { id }, {
        headers: {
            token: "m35"
        }

    })
        .then((response) => {
            console.log(response.data.data)

            return response.data.data

        }).catch((error) => {
            console.log(error.response)
        })
    return response
}

export const fetchDestinationGallery = (id) => {
    const response = axios.post(baseURL + 'gallery', { id })
        .then((response) => {


            return response.data.data

        }).catch((error) => {

        })
    return response
}

