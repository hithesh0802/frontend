import React, { useEffect, useState } from 'react';
import { getWorkouts, getGoals, createGoal } from '../services/api';
import { createWorkout } from '../services/api';
import '../DashBoard.css';

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [type,setType]=useState('');
    const [duration,setDuration]=useState(0);
    const [calories,setCalories]=useState(0);
    const [notes,setNotes]= useState('');
    const [description,setDescription]= useState('');
    const [target,setTarget]= useState(0);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try { 
                const token= localStorage.getItem('token');
                await getWorkouts(token).then((res) => {
                    setWorkouts(res);
                });
                console.log(workouts);
            } catch (error) {
                setError(error.message);
            }
        };

        const fetchGoals = async () => {
            try {
                const token= localStorage.getItem('token');
                const goalsData = await getGoals(token);
                setGoals(goalsData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchWorkouts();
        fetchGoals();
    }, []);

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

    const GoalSubmit= async(e)=>{
        e.preventDefault();
        try{
          const token= localStorage.getItem('token');
          const data={description,target};
          await createGoal({token,data}).then((res)=>{
            console.log(res?.data);
          });
        }catch(err){
          console.log('couldn"t add goal!', err);
        }
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h1>Dashboard</h1>
            <h2>Workouts</h2>
            <ul>
                {workouts.map(workout => (
                    <li key={workout._id}>{workout.type}: {workout.duration} minutes</li>
                ))}
            </ul>
            <h2>Goals</h2>
            <ul>
                {goals.map(goal => (
                    <li key={goal._id}>{goal.description}: {goal.target} kg</li>
                ))}
            </ul>
            <h2>Add a new Workout</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Enter the Type of Workout' value={type} onChange={(e)=> setType(e.target.value)}></input>
                <input type='Number' placeholder='Enter the Duration of Workout' value={duration} onChange={(e)=> setDuration(e.target.value)}></input>
                <input type='Number' placeholder='Target Calories:' value={calories} onChange={(e)=> setCalories(e.target.value)}></input>
                <input type='text' placeholder='Additional Notes' value={notes} onChange={(e)=> setNotes(e.target.value)}></input>
                <button type="submit" >Submit</button>
            </form>
            <h2>Add a new Goal</h2>
            <form onSubmit={GoalSubmit}>
                <input type='text' placeholder='Enter the Description of Goal' value={description} onChange={(e)=> setDescription(e.target.value)}></input>
                <input type='Number' placeholder='Enter the Target value' value={target} onChange={(e)=> setTarget(e.target.value)}></input>
                <button type="submit" >Submit</button>
            </form>
        </div>
    );
};

export default Dashboard;
