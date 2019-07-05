import { APIMethods, storage } from "../constants";

const standardHeaders = { 'Content-Type': 'application/json' };
const localhost = 'localhost';

class AJAX {
    constructor() {
        const location = window.location.hostname;

        this.baseUrl = location === localhost ? `http://${ location }:3000` : `https://${ location }`;
    }

    get token () {
        return sessionStorage.getItem(storage.token);
    }

    set token (token) {
        sessionStorage.setItem(storage.token, token);
    }

    get requestHeaders () {
        return this.token ? { ...standardHeaders, 'Authorization': this.token } : standardHeaders;
    }

    makeRequest (url, method = APIMethods.get, body) {
        const standardOptions = { method, headers: this.requestHeaders };
        const options = body ? { ...standardOptions, body: JSON.stringify(body) } : standardOptions;

        return fetch(`${ this.baseUrl }/${ url }`, options)
            .then(response => response.json());
    }
}

export const ajax = new AJAX();
