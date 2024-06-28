import React, { useEffect, useState } from 'react';
import { getWorkouts, getGoals, createGoal, updateProgress, searchFriend, MyProfile } from '../services/api';
import { createWorkout } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './DashBoard.css';

const Dashboard = () => {
    const [workouts, setWorkouts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState(null);
    const [type,setType]=useState('');
    const [duration,setDuration]=useState('');
    const [calories,setCalories]=useState('');
    const [notes,setNotes]= useState('');
    const [description,setDescription]= useState('');
    const [target,setTarget]= useState('');
    const [progress,setProgress]= useState('');
    const navigate= useNavigate();
    const [username, setUsername] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
        await searchFriend(`${user._id}`,username).then((res)=>{
            console.log(res);
            setSearchResult(res);
        })
        } catch (error) {
        console.error('Error searching for friends:', error);
        }
    };

    useEffect(() => {
        const fetchWorkouts = async () => {
            try { 
                const token= localStorage.getItem('token');
                await getWorkouts(token).then((res) => {
                    setWorkouts(res);
                });
                // console.log(workouts);
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

        const fetchProfile = async () => {
            try {
            const response =await MyProfile();
            // console.log(response.data,response);
            setUser(response);
            setLoading(false);
            } catch (error) {
            console.error('Error fetching profile:', error);
            setLoading(false);
            }
        };

        fetchWorkouts();
        fetchGoals();
        fetchProfile();
    }, []);

    useEffect(()=>{
        document.body.style.margin= 0;
        document.body.style.fontFamily= 'Arial, sans-serif';
        document.body.style.background= '#121212';
        document.body.style.color= '#ffffff';
        document.body.style.webkitFontSmoothing= 'antialiased';
        document.body.style.mozOsxFontSmoothing= 'grayscale';
        document.body.style.width='100vw';
    })

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

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleFeed= async() =>{
        navigate('/socialfeed');
    }

    const handleProgressUpdate = async (goalId, currentProgress) => {
        try {
            await updateProgress(goalId, currentProgress );
        } catch (err) {
            console.log("couldn't update progress!", err);
        }
    };

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

      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (!user) {
        return <div>User not found</div>;
      }

    return (
        <div className="dashboard">
            <nav className="navbar">
                <h1>Dashboard</h1>
                
                <div className="nav-links">
                    {/* <Link to="/profile" className='profile-button' >Profile</Link> */}
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                    <button className='logout-button' onClick={handleFeed}>Social Feed</button>
                </div>
            </nav>
            <div>

            </div>

            <div className="search-friends-container">
                    <form onSubmit={handleSearch}>
                        <input
                        type="text"
                        placeholder="Add/search friends by Username..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        />
                        <button type="submit">Search</button>
                    </form>

                    <div className="search-results">
                            {searchResult.length > 0 ? (
                            searchResult.map((result) => (
                                <div key={result._id} className="friend-card">
                                <h3>Username : {result.username}</h3>
                                <p>Email: {result.email}</p>
                                </div>
                            ))
                            ) : (
                            <p>No friends found</p>
                            )}
                        </div>
                    </div>
            <div className="dashboard-content">
                <div className="dashboard-section">
                <div className="profile-container">
                    <h2>My Profile</h2>
                    <div className="profile-details">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                    </div>
                    </div>
                    <h2>My Workouts</h2>
                    <div className="card-container">
                        {workouts.map(workout => (
                            <div className="card" key={workout._id}>
                                <h3>{workout.type}</h3>
                                <p>Duration: {workout.duration} minutes</p>
                                <p>Calories: {workout.calories}</p>
                                <p>Notes: {workout.notes}</p>
                                <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="dashboard-section">
                    <h2>My Goals</h2>
                    <div className="card-container">
                        {goals.map(goal => (
                            <div className="card" key={goal._id}>
                                <h3>{goal.description}</h3>
                                <p>Target: {goal.target}</p>
                                <p>Progress: {goal.currentProgress}%</p>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{border: `3px solid yellow` , width: `${(goal.currentProgress)}%` }}></div>
                        </div>
                        <div>
                        <input className="input-container"
                            type="number"
                            placeholder="Update current progress"
                            onChange={(e) => { setProgress(e.target.value)
                            }}
                        />
                            <button className="update-progress-button" onClick={() => handleProgressUpdate(goal._id.toString(), progress)}>Update Progress</button>
                        </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="form-wrapper">                    
                    <form onSubmit={handleSubmit} className="form-container">
                    <h2>Add new Workout</h2>
                        <input type="text" placeholder="Enter the Type of Workout" value={type} onChange={(e) => setType(e.target.value)} />
                        <input type="number" placeholder="Enter the Duration of Workout (in min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <input type="number" placeholder="Target Calories (cal):" value={calories} onChange={(e) => setCalories(e.target.value)} />
                        <input type="text" placeholder="Additional Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className="form-wrapper">                    
                    <form onSubmit={GoalSubmit} className="form-container">
                    <h2>Add new Goal</h2>
                        <input type="text" placeholder="Enter the Description of Goal" value={description} onChange={(e) => setDescription(e.target.value)} />
                        <input type="text" placeholder="Enter your Target" value={target} onChange={(e) => setTarget(e.target.value)} />
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
