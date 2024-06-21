import axios from 'axios';

const API_URL = 'http://localhost:5000/api' ;

// const getToken = () => {
//     return localStorage.getItem('token');
// };

// export const setAuthToken = (token) => {
//   if (token) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete axios.defaults.headers.common['Authorization'];
//   }
// };

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData);
  return response.data;
};
// Workout API calls

export const createWorkout = async (token, workoutData) => {
  try {
      const response = await axios.post(`${API_URL}/workouts`, token.data,{
        headers: {Authorization : `Bearer ${token.token}`} ,
      });
      return response.data;
  } catch (error) {
      console.error('Error creating workout:', error);
      throw error;
  }
};

export const getWorkouts = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/workouts`,{
        headers: {Authorization : `Bearer ${token}`} ,
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;
  }
};

export const createGoal = async (token, goalData) => {
  console.log(token.data);
  try {
      const response = await axios.post(`${API_URL}/goals`, token.data ,{
        headers: {Authorization : `Bearer ${token.token}`},
      });
      return response.data;
  } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
  }
};

export const getGoals = async (token) => {
  try {
      const response = await axios.get(`${API_URL}/goals`,{
        headers: {Authorization : `Bearer ${token}`} ,
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching goals:', error);
      throw error;
  }
};