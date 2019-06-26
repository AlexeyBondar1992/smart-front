import { ajax } from './helpers/AJAX';

class UserService {
    authorize () {
        return !ajax.token ? Promise.reject() : this.getUserId()
            .then(userId => this.getUserProfile(userId));
    }

    signIn (email, password) {
        return ajax.makeRequest('signin', 'post', { email, password })
            .then(({ userId, success, token }) => {
                if (token) {
                    ajax.token = token;
                }
                if (userId && success) {
                    return userId;
                }
            })
            .then(userId => this.getUserProfile(userId));
    }

    getUserId () {
        return ajax.makeRequest('signin', 'post')
            .then(data => (data && data.userId) || Promise.reject('Please sign in'));
    }

    getUserProfile (id) {
        return ajax.makeRequest(`profile/${id}`);
    }
}

export default new UserService();