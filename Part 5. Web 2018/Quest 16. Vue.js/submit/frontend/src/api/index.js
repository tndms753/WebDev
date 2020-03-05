import axios from 'axios';

export default {
    async login(data) {
        try {
            const res = await axios.post('http://127.0.0.1:8082/auth/login', {data});
            return res;
        } catch (e) {
            console.error(e);
        }
    },
    async logout () {
        try {
            const res = axios.post('http://127.0.0.1:8082/auth/logout');
            return res;
        } catch (e) {
            console.errorr(e);
        }
    },
    async getUserData (token) {
        try {
            const res = axios.get('http://127.0.0.1:8082/userdata', {
                headers: {
                    'x-access-token': token
                }
            });
            return res;
        } catch (e) {
            console.error(e)
        }
    },
    async postUserData (token, data) {
        try {
            const res = await axios.post('http://127.0.0.1:8082/userdata', data, {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    },

    async savePost (token, data) {
        try {
            const res = await axios.post('http://127.0.0.1:8082/notepad', data, {
                headers: {
                    'x-access-token': token
                },
            })
            return res;
        } catch (e) {
            console.error(e);
        }
    }
}