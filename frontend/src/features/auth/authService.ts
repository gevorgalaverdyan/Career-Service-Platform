import axios from 'axios';

const API_URL = '/auth/';

//register

//login
const login = async (userData: any) => {
  const response = await axios.post(`${API_URL}login`, userData);

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
  logout,
  login,
};

export default authService;
