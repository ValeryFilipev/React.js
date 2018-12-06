import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-65639.firebaseio.com/'
});

export default instance;