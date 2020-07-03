import axios from 'axios';

// const AUTHORIZATION_TOKEN = localStorage.getItem('token')
const AUTHORIZATION_TOKEN = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyYWZhbW9sYUBnbWFpbC5jb20iLCJleHAiOjE1OTM4MDc2OTF9.puuoV_ULINGl-XDGvLEIOW2DnAZG6HtIrn24FFm1RRLSf3B-9phxoYTY8mzv9iLQBCHTiiVNXjj3jJ0BMDPZ_A'
const BASE_URL = `http://localhost:8080`


let HTTP_CLIENT = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Authorization': AUTHORIZATION_TOKEN,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
})

const errorHandler = (error) => {

    if (typeof error.response !== "undefined") {

        switch (error.response.status) {
            case 401:
                document.location = '/401';
                break;
            case 403:
                document.location = '/403';
                break;
            // default:
            //     document.location = '/500';
            //     break;
        }

    } else {
        document.location = '/';
    }

    return Promise.reject({ ...error })
}


const successHandler = (response) => {
    return response
}


export default class ApiService {

    constructor(apiurl) {
        this.apiurl = apiurl;

        HTTP_CLIENT.interceptors.response.use(
            response => successHandler(response),
            error => errorHandler(error)
        )
    }


    post(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return HTTP_CLIENT.post(requestUrl, objeto)
    }

    put(url, objeto) {
        const requestUrl = `${this.apiurl}${url}`
        return HTTP_CLIENT.put(requestUrl, objeto)
    }

    delete(url) {
        const requestUrl = `${this.apiurl}${url}`
        return HTTP_CLIENT.delete(requestUrl)
    }

    get(url) {
        const requestUrl = `${this.apiurl}${url}`
        return HTTP_CLIENT.get(requestUrl)
    }

}