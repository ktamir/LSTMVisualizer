import {observable, action, decorate} from 'mobx';
import axios from "axios";
import {API_URL} from "../consts";
import {create, persist} from "mobx-persist";

class AuthStore {
    userToken = '';
    apiKey = '';
    email = '';
    isAuthenticated = undefined;

    login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            this.email = email;
            this.apiKey = response.data.api_key;
            this.userToken = response.data.user_token;
            this.isAuthenticated = true;
        }
        catch (e) {
            console.log(e);
        }
    };

    register = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password});
            this.email = email;
            this.apiKey = response.data.api_key;
            this.userToken = response.data.user_token;
            this.isAuthenticated = true;
            return response;
        }
        catch (e) {
            console.log(e);
        }
    };

    logout = () => {
        this.userToken = '';
        this.apiKey = '';
        this.email = '';
        this.isAuthenticated = false;
    };
}

decorate(AuthStore, {
    userToken: [observable, persist], apiKey: [observable, persist], email: [observable, persist],
    isAuthenticated: [observable], login: action, register: action
});

const hydrate = create({
    storage: localStorage,   // or AsyncStorage in react-native.
    // default: localStorage
    jsonify: true  // if you use AsyncStorage, here should be true
    // default: true
});

const authStore = new AuthStore();
export default authStore;

hydrate('lstmAuth', authStore).then(() => {

});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    // Do something with response error
    authStore.isAuthenticated = error.response.status !== 401;
    return Promise.reject(error);
});
