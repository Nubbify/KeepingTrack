import axios from 'axios';

const setRefreshToken = refresh_token => {
    if (refresh_token) {
        axios.defaults.headers.common['x-refresh-token'] = refresh_token;
    } else {
        delete axios.defaults.headers.common['x-refresh-token'];
    }
};

export default setRefreshToken;