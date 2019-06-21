class AJAX {
    makeRequest (url, method = 'get', body) {
        const standardOptions = { method, headers: this.requestHeaders };
        const options = body ? { ...standardOptions, body: JSON.stringify(body) } : standardOptions;

        return fetch(`http://localhost:3000/${url}`, options)
            .then(response => response.json());
    }
}