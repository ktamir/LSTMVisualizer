import {observable, action, decorate} from 'mobx';
import axios from "axios";
import {API_URL} from "../consts";
import {create, persist} from "mobx-persist";

class AuthStore {
    userToken = '';
    apiKey = '';
    email = '';

    login = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password});
            console.log(response);
            this.email = email;
            this.apiKey = response.data.api_key;
            this.userToken = response.data.user_token;
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
            return response;
        }
        catch (e) {
            console.log(e);
        }
    }
}

decorate(AuthStore, {userToken: [observable, persist], apiKey: [observable, persist], email: [observable, persist],
    login: action, register: action});

const hydrate = create({
    storage: localStorage,   // or AsyncStorage in react-native.
                            // default: localStorage
    jsonify: true  // if you use AsyncStorage, here should be true
                    // default: true
});

const authStore = new AuthStore();
export default authStore;

hydrate('lstmAuth', authStore).then(() => console.log('someStore has been hydrated'));