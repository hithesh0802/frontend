import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createWorkout } from '../services/api';

const WorkoutForm = () => {

  const navigate= useNavigate();
  const [type,setType]=useState('');
  const [duration,setDuration]=useState(0);
  const [calories,setCalories]=useState(0);
  const [notes,setNotes]= useState('');

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const token= localStorage.getItem('token');
      const data={type,duration,calories,notes};
      await createWorkout({token,data}).then((res)=>{
        console.log(res?.data);
      });
    }catch(err){
      console.log('couldn"t add workout!', err);
    }
  }
  return(
  <div>
    <h1>Workout Form</h1>
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Enter the Type of Workout' value={type} onChange={(e)=> setType(e.target.value)}></input>
      <input type='Number' placeholder='Enter the Duration of Workout' value={duration} onChange={(e)=> setDuration(e.target.value)}></input>
      <input type='Number' placeholder='Target Calories:' value={calories} onChange={(e)=> setCalories(e.target.value)}></input>
      <input type='text' placeholder='Additional Notes' value={notes} onChange={(e)=> setNotes(e.target.value)}></input>
      <button type="submit" >Submit</button>
    </form>
    {/* <button onClick={navigate('/dashboard')}>Go Back</button>    */}
  </div>
  );
};

export default WorkoutForm;
