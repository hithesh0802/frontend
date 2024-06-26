import axios from "axios";
import { useEffect, useState } from "react";

const SocialFeed =()=>{
    const[users,setUsers]=useState([]);
    const[workouts,setWorkouts]=useState([]);
    const[goals,setGoals]= useState([]);
    const API_URL= 'http://localhost:5000/socialfeed'

    useEffect(()=>{
        const fetchUsers= async() =>{
            setUsers(axios.get(`${API_URL}/users`));
        }

        fetchUsers();
    },[]);

    const fetchWorkouts = async(id)=>{
        setWorkouts( await axios.get(`${API_URL}/workouts/${id}`));
        const ans= workouts.map((workout,index) =>{
            <p>{workout.type}</p> ;
            <p>Duration: {workout.duration}mins</p>;
        });
        return ans;
    }

    const fetchGoals = async(id)=>{
        setGoals(await axios.get(`${API_URL}/goals/${id}`));
        const ans= goals.map((goal,index) =>{
            <p>{goal.type}</p> ;
            <p>Duration: {goal.description}</p>;
        });
        return ans;
    }


    return(
        <div className="social-feed">
        <h2>Social Feed</h2>
        {users.map((user, index) => (
            <div key={index} className="update-card">
            <h2>{user.username} </h2>
            <h3>Completed Workouts:</h3>
            <p>{fetchWorkouts(user._id)}</p>
            <h3>Completed Goals</h3>
            <p>{fetchGoals(user._id)}</p>
            </div>
        ))}
        </div>
    )
}

export default SocialFeed;