import axios from 'axios';

const API_URL = 'http://localhost:5000/api' ;

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

export const updateProgress = async (goalId, currentProgress) => {
  const token = localStorage.getItem('token');
  console.log(token);
  const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
  };

  const body = {
      currentProgress: Number(currentProgress)
  };
  const id= goalId;
  console.log(currentProgress,goalId,body);
  try {
      const response = await axios.put(`/api/goals/${id}`, body, { headers });
      return response.data; // Return updated goal data if needed
  } catch (error) {
      console.error('Error updating goal progress:', error);
      throw error; // Handle error in calling function
  }
};

export const searchFriend= async(id,username) =>{
  console.log(id,username);
  try{
    const body ={
      username : username
    };
    console.log(`${API_URL}/users/friends/${id}`,body);
    const response= await axios.post(`${API_URL}/users/friends/${id}`,body,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }catch(error){
    console.log('error finding users',error);
    throw error;
  }
}

export const MyProfile= async()=>{
  try{
    const token = localStorage.getItem('token');
    console.log(token);
    const response= await axios.get(`${API_URL}/users/profile`, {
      headers: {Authorization : `Bearer ${token}`} ,
    });
    return response.data;
  }catch(error){
    console.log("error fetching profile",error);
    throw error;
  }
}

export const fetchAllUsers = async () => {
  try {
      const response = await axios.get(`${API_URL}/socialfeed/users`);
      return response.data.users;
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
};

export const fetchWorkoutsByUserId = async (userId) => {
  try{
    const response = await axios.get(`${API_URL}/socialfeed/workouts/${userId}`);
    return response.data.workouts;
  } catch (error){
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const fetchGoalsByUserId = async (userId) => {
  try{
  const response = await axios.get(`${API_URL}/socialfeed/goals/${userId}`);
  return response.data.goals;
  }catch(error){
    console.error('Error fetching users:', error);
    throw error;
  }
};