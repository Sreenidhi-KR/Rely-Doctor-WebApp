import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://7d30-103-156-19-229.in.ngrok.io/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }
  
}

export default new UserService();
  