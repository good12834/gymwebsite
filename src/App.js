import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import Footer
import Home from './pages/Home'; // Assume these exist or adjust paths
import Classes from './pages/Classes';
import Membership from './pages/Membership';
import Trainers from './pages/Trainers';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import BMICalculator from './pages/BMICalculator';
import WorkoutTracker from './pages/WorkoutTracker';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container"> {/* Wrapper for flex layout */}
        <Navbar />
        <main className="main-content"> {/* Main content area */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/workout-tracker" element={<WorkoutTracker />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer /> {/* Footer added here */}
      </div>
    </Router>
  );
}

export default App;