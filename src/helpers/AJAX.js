const standardHeaders = { 'Content-Type': 'application/json' };
const localhost = 'localhost';

class AJAX {
    constructor() {
        const location = window.location.hostname;
        const protocol = location === localhost ? 'http://' : 'https://';

        this.baseUrl = `${ protocol }${ location }`;
    }

    get token () {
        return sessionStorage.getItem('token');
    }

    set token (token) {
        sessionStorage.setItem('token', token);
    }

    get requestHeaders () {
        return this.token ? { ...standardHeaders, 'Authorization': this.token } : standardHeaders;
    }

    makeRequest (url, method = 'get', body) {
        const standardOptions = { method, headers: this.requestHeaders };
        const options = body ? { ...standardOptions, body: JSON.stringify(body) } : standardOptions;

        console.log(window.location.hostname, this.baseUrl);

        return fetch(`${ this.baseUrl }:3000/${ url }`, options)
            .then(response => response.json());
    }
}

export const ajax = new AJAX();
