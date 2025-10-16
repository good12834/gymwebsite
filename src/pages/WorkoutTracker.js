import React, { useState } from 'react';
import { FaPlus, FaTrash, FaChartLine, FaBullseye } from 'react-icons/fa';

function WorkoutTracker() {
    const [workouts, setWorkouts] = useState([]);
    const [formData, setFormData] = useState({ date: '', exercise: '', reps: '', sets: '', weight: '' });
    const [goal, setGoal] = useState({ exercise: '', targetReps: '', targetSets: '', targetWeight: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGoalChange = (e) => {
        const { name, value } = e.target;
        setGoal(prev => ({ ...prev, [name]: value }));
    };

    const addWorkout = (e) => {
        e.preventDefault();
        if (!formData.date || !formData.exercise) return;
        const newWorkout = { ...formData, id: Date.now(), reps: parseInt(formData.reps) || 0, sets: parseInt(formData.sets) || 0, weight: parseFloat(formData.weight) || 0 };
        setWorkouts(prev => [...prev, newWorkout]);
        setFormData({ date: '', exercise: '', reps: '', sets: '', weight: '' });
    };

    const setWorkoutGoal = (e) => {
        e.preventDefault();
        console.log("Goal Set:", goal);
    };

    const removeWorkout = (id) => {
        setWorkouts(prev => prev.filter(workout => workout.id !== id));
    };

    const calculateProgress = () => {
        if (!goal.exercise || workouts.length === 0) return "No progress data yet.";
        const relevantWorkouts = workouts.filter(w => w.exercise === goal.exercise);
        if (relevantWorkouts.length === 0) return "No workouts logged for this goal.";
        const latest = relevantWorkouts[relevantWorkouts.length - 1];
        return `Latest: ${latest.reps} reps, ${latest.sets} sets, ${latest.weight} kg vs Goal: ${goal.targetReps} reps, ${goal.targetSets} sets, ${goal.targetWeight} kg`;
    };

    return (
        <div className="workout-tracker">
            <h2>Workout Tracker</h2>
            <p className="tracker-intro">Log your workouts, track progress, and set fitness goals!</p>

            {/* Workout Log Form */}
            <section className="workout-form-section">
                <h3><FaPlus /> Log a Workout</h3>
                <form onSubmit={addWorkout} className="workout-form">
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Exercise:</label>
                        <input type="text" name="exercise" placeholder="e.g., Bench Press" value={formData.exercise} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Reps:</label>
                        <input type="number" name="reps" placeholder="e.g., 10" value={formData.reps} onChange={handleChange} min="0" />
                    </div>
                    <div className="form-group">
                        <label>Sets:</label>
                        <input type="number" name="sets" placeholder="e.g., 3" value={formData.sets} onChange={handleChange} min="0" />
                    </div>
                    <div className="form-group">
                        <label>Weight (kg):</label>
                        <input type="number" name="weight" placeholder="e.g., 50" value={formData.weight} onChange={handleChange} step="0.1" min="0" />
                    </div>
                    <button type="submit" className="add-btn"><FaPlus /> Add Workout</button>
                </form>
            </section>

            {/* Goal Setting */}
            <section className="goal-section">
                <h3><FaBullseye /> Set a Goal</h3>
                <form onSubmit={setWorkoutGoal} className="goal-form">
                    <div className="form-group">
                        <label>Exercise:</label>
                        <input type="text" name="exercise" placeholder="e.g., Bench Press" value={goal.exercise} onChange={handleGoalChange} required />
                    </div>
                    <div className="form-group">
                        <label>Target Reps:</label>
                        <input type="number" name="targetReps" placeholder="e.g., 12" value={goal.targetReps} onChange={handleGoalChange} min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Target Sets:</label>
                        <input type="number" name="targetSets" placeholder="e.g., 4" value={goal.targetSets} onChange={handleGoalChange} min="0" required />
                    </div>
                    <div className="form-group">
                        <label>Target Weight (kg):</label>
                        <input type="number" name="targetWeight" placeholder="e.g., 60" value={goal.targetWeight} onChange={handleGoalChange} step="0.1" min="0" required />
                    </div>
                    <button type="submit" className="set-goal-btn"><FaBullseye /> Set Goal</button>
                </form>
            </section>

            {/* Progress Summary */}
            <section className="progress-summary">
                <h3><FaChartLine /> Progress Summary</h3>
                <p>{calculateProgress()}</p>
            </section>

            {/* Workout Log */}
            <section className="workout-log">
                <h3>Workout Log</h3>
                {workouts.length === 0 ? (
                    <p>No workouts logged yet. Start adding above!</p>
                ) : (
                    <div className="workout-list">
                        {workouts.map(workout => (
                            <div key={workout.id} className="workout-card">
                                <p><strong>Date:</strong> {workout.date}</p>
                                <p><strong>Exercise:</strong> {workout.exercise}</p>
                                <p><strong>Reps:</strong> {workout.reps}</p>
                                <p><strong>Sets:</strong> {workout.sets}</p>
                                <p><strong>Weight:</strong> {workout.weight} kg</p>
                                <button className="remove-btn" onClick={() => removeWorkout(workout.id)}><FaTrash /> Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default WorkoutTracker;