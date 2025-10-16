import React, { useState } from 'react';
import { FaCalculator, FaHistory, FaRuler, FaWeight, FaTrash } from 'react-icons/fa';

function BMICalculator() {
    const [formData, setFormData] = useState({ height: '', weight: '', unit: 'metric' });
    const [bmi, setBMI] = useState(null);
    const [history, setHistory] = useState([]);
    const [, setShowTips] = useState(false);

    const healthTips = {
        underweight: "Consider consulting a nutritionist to increase muscle mass or calorie intake safely.",
        normal: "Great job! Maintain your healthy lifestyle with regular exercise and balanced nutrition.",
        overweight: "Incorporate more cardio and strength training to improve your fitness level.",
        obese: "Consult a trainer or doctor for a personalized plan to reach a healthier weight."
    };

    const calculateBMI = () => {
        let height = parseFloat(formData.height);
        let weight = parseFloat(formData.weight);
        if (!height || !weight) return;

        if (formData.unit === 'imperial') {
            height *= 0.0254; // Convert inches to meters
            weight *= 0.453592; // Convert pounds to kilograms
        }

        const bmiValue = (weight / (height * height)).toFixed(1);
        setBMI(bmiValue);
        const category = bmiValue < 18.5 ? 'underweight' : bmiValue < 25 ? 'normal' : bmiValue < 30 ? 'overweight' : 'obese';
        const newEntry = { id: Date.now(), bmi: bmiValue, category, date: new Date().toLocaleDateString() };
        setHistory(prev => [...prev, newEntry]);
        setShowTips(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const toggleUnit = () => {
        setFormData(prev => ({ ...prev, unit: prev.unit === 'metric' ? 'imperial' : 'metric', height: '', weight: '' }));
        setBMI(null);
        setShowTips(false);
    };

    const clearHistory = (id) => {
        setHistory(prev => prev.filter(entry => entry.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        calculateBMI();
    };

    return (
        <div className="bmi-calculator">
            <h2>BMI Calculator</h2>
            <p className="bmi-intro">Calculate your Body Mass Index to track your fitness progress!</p>

            {/* BMI Calculator Form */}
            <section className="bmi-form-section">
                <form onSubmit={handleSubmit} className="bmi-form">
                    <div className="form-group">
                        <label>{formData.unit === 'metric' ? 'Height (meters)' : 'Height (inches)'}:</label>
                        <input
                            type="number"
                            name="height"
                            placeholder={formData.unit === 'metric' ? 'e.g., 1.75' : 'e.g., 68'}
                            value={formData.height}
                            onChange={handleChange}
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{formData.unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}:</label>
                        <input
                            type="number"
                            name="weight"
                            placeholder={formData.unit === 'metric' ? 'e.g., 70' : 'e.g., 154'}
                            value={formData.weight}
                            onChange={handleChange}
                            step="0.1"
                            min="0"
                            required
                        />
                    </div>
                    <button type="submit" className="calculate-btn"><FaCalculator /> Calculate BMI</button>
                    <button type="button" className="unit-toggle-btn" onClick={toggleUnit}>
                        {formData.unit === 'metric' ? <FaRuler /> : <FaWeight />}
                        {formData.unit === 'metric' ? ' Switch to Imperial' : ' Switch to Metric'}
                    </button>
                </form>
            </section>

            {/* Results Display */}
            {bmi && (
                <section className="bmi-results">
                    <h3>Your BMI: {bmi}</h3>
                    <p>Category: {bmi < 18.5 ? 'Underweight' : bmi < 25 ? 'Normal' : bmi < 30 ? 'Overweight' : 'Obese'}</p>
                    <p className="health-tip">{healthTips[bmi < 18.5 ? 'underweight' : bmi < 25 ? 'normal' : bmi < 30 ? 'overweight' : 'obese']}</p>
                </section>
            )}

            {/* History Tracker */}
            <section className="bmi-history">
                <h3><FaHistory /> Calculation History</h3>
                {history.length === 0 ? (
                    <p>No history yet. Calculate your BMI to start!</p>
                ) : (
                    <div className="history-list">
                        {history.map(entry => (
                            <div key={entry.id} className="history-item">
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>BMI:</strong> {entry.bmi}</p>
                                <p><strong>Category:</strong> {entry.category}</p>
                                <button className="clear-btn" onClick={() => clearHistory(entry.id)}><FaTrash /> Clear</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

export default BMICalculator;