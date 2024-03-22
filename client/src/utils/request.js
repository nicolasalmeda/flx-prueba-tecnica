import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:4000/';

export const get = (url) => {
  return axios.get(url);
}

export const deleteU = (url) => {
  return axios.delete(url);
}

export const post = (url, data) => {
  return axios.post(url, data);
}

export const put = (url, data) => {
  return axios.put(url, data);
}