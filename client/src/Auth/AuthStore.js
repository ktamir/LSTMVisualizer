import {observable, action, decorate} from 'mobx';
import axios from "axios";
import {API_URL} from "../consts";

class AuthStore {
    userToken = '';
    apiKey = '';
    email = '';

    login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            this.email = email;
            this.apiKey = response.apiKey;
            this.userToken = response.userToken;
        }
        catch (e) {
            console.log(e);
        }
    };

    register = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password});
            this.email = email;
            this.apiKey = response.apiKey;
            this.userToken = response.userToken;
        }
        catch (e) {
            console.log(e);
        }
    }
}

decorate(AuthStore, {userToken: observable, apiKey: observable, email: observable, login: action, register: action});

export default new AuthStore();