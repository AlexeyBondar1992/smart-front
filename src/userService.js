import { ajax } from './helpers/AJAX';
import { APIUrls, APIMethods } from "./constants";

class UserService {
    authorize () {
        return !ajax.token ? Promise.reject() : this.getUserId()
            .then(userId => this.getUserProfile(userId));
    }

    signIn (email, password) {
        return ajax.makeRequest(APIUrls.signIn, APIMethods.post, { email, password })
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
        return ajax.makeRequest(APIUrls.signIn, APIMethods.post)
            .then(data => (data && data.userId) || Promise.reject('Please sign in'));
    }

    getUserProfile (id) {
        return ajax.makeRequest(`${APIUrls.profile}/${id}`);
    }
}

export default new UserService();