const standardHeaders = { 'Content-Type': 'application/json' };

class UserService {
    get token () {
        return sessionStorage.getItem('token');
    }

    set token (token) {
        sessionStorage.setItem('token', token);
    }

    get requestHeaders () {
        return this.token ? { ...standardHeaders, 'Authorization': this.token } : standardHeaders;
    }

    authorize () {
        return !this.token ? Promise.reject() : this.getUserId()
            .then(userId => this.getUserProfile(userId));
    }

    signIn (email, password) {
        return this.makeRequest('signin', 'post', { email, password })
            .then(({ userId, success, token }) => {
                if (token) {
                    this.token = token;
                }
                if (userId && success) {
                    return userId;
                }
            })
            .then(userId => this.getUserProfile(userId));
    }

    getUserId () {
        return this.makeRequest('signin', 'post')
            .then(data => (data && data.userId) || Promise.reject('Please sign in'));
    }

    getUserProfile (id) {
        return this.makeRequest(`profile/${id}`);
    }

    makeRequest (url, method = 'get', body) {
        const standardOptions = { method, headers: this.requestHeaders };
        const options = body ? { ...standardOptions, body: JSON.stringify(body) } : standardOptions;

        return fetch(`http://localhost:3000/${url}`, options)
            .then(response => response.json());
    }
}

export default new UserService();