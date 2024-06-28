import React, { useEffect, useState } from 'react';
import { fetchAllUsers, fetchWorkoutsByUserId, fetchGoalsByUserId } from '../services/api'; // Adjust the import path as necessary
import './SocialFeed.css'; // Import the CSS file

const SocialFeed = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const fetchedUsers = await fetchAllUsers();
                const usersWithDetails = await Promise.all(
                    fetchedUsers.map(async user => {
                        const workoutsResponse = await fetchWorkoutsByUserId(user._id);
                        const goalsResponse = await fetchGoalsByUserId(user._id);
                        const workouts = Array.isArray(workoutsResponse) ? workoutsResponse : [];
                        const goals = Array.isArray(goalsResponse) ? goalsResponse : [];
                        return { ...user, workouts, goals };
                    })
                );
                setUsers(usersWithDetails);
            } catch (err) {
                setError(err.message);
            }
        };
        getUsers();
    }, []);

    return (
        <div className="container">
        <div className="social-feed-container">
            <h2 className="social-feed-header">FITLIFE SOCIAL</h2>
            {error && <div className="error">Error: {error}</div>}
            <ul className="social-feed-list">
                {users.map(user => (
                    <li key={user._id} className="social-feed-item">
                        <h3>{user.username}</h3>
                        <p>Email: {user.email}</p>
                        <div className="workouts">
                            <h4>Workouts:</h4>
                            {user.workouts.length ? (
                                <ul>
                                    {user.workouts.map(workout => (
                                        <li key={workout._id}>
                                            <p>Type: {workout.type}</p>
                                            <p>Duration: {workout.duration} minutes</p>
                                            <p>Calories: {workout.calories} cal</p>
                                            <p>Notes: {workout.notes}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No workouts logged.</p>
                            )}
                        </div>
                        <div className="goals">
                            <h4>Goals:</h4>
                            {user.goals.length ? (
                                <ul>
                                    {user.goals.map(goal => (
                                        <li key={goal._id}>
                                            <p>Description: {goal.description}</p>
                                            <p>Target: {goal.target}</p>
                                            <p>Progress: {goal.currentProgress}%</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No goals set.</p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default SocialFeed;