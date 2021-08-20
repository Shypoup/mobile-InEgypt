import axios from 'axios';
import { baseURL } from '../constants/api';

export const fetchCategories = (language) => {
    const response = axios.get(baseURL + 'category/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchActivites = (language) => {
    const response = axios.get(baseURL + 'activity/' + language)
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}

export const fetchToCategory = (id, language) => {
    const response = axios.post(baseURL + 'selectcategory/' + language, { id: id })
        .then((response) => {

            return response.data.data

        }).catch((error) => {

        })
    return response
}