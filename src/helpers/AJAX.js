const standardHeaders = { 'Content-Type': 'application/json' };

class AJAX {
    constructor() {
        this.baseUrl = window.location.hostname;
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

        return fetch(`http://${ this.baseUrl }:3000/${ url }`, options)
            .then(response => response.json());
    }
}

export const ajax = new AJAX();
