import axios from 'axios';

const API_URL = '/auth/';

//register
const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}register`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

//login
const login = async (userData: any) => {
  const response = await axios.post(`${API_URL}login`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//Update
const update = async (userData: any, userId: string) => {
  const response = await axios.put(`/user-info/${userId}`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

//logout
const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  register,
  logout,
  login,
  update,
};

export default authService;
