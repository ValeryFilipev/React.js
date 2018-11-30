//https://console.firebase.google.com/u/0/project/react-my-burger-65639/database/react-my-burger-65639/data/
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-65639.firebaseio.com/'
});

export default instance;