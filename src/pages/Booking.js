import React, { useState } from 'react';
import { FaCheck, FaTimes, FaCreditCard, FaStickyNote, FaFilter, } from 'react-icons/fa';

function Booking() {
    const trainers = [
        {
            id: 1,
            name: "John Doe",
            specialty: "Strength Training",
            availability: {
                "2025-02-24": ["9:00 AM", "10:00 AM"],
                "2025-02-25": ["9:00 AM"],
                "2025-02-26": ["2:00 PM", "3:00 PM"],
                "2025-02-27": ["2:00 PM"],
                "2025-02-28": ["6:00 PM", "7:00 PM"]
            }
        },
        {
            id: 2,
            name: "Jane Smith",
            specialty: "Yoga",
            availability: {
                "2025-02-24": ["7:00 AM"],
                "2025-02-25": ["7:00 AM", "8:00 AM"],
                "2025-02-26": ["6:00 PM"],
                "2025-02-27": ["6:00 PM", "7:00 PM"],
                "2025-02-28": ["10:00 AM"]
            }
        },
        {
            id: 3,
            name: "Mike Johnson",
            specialty: "Cardio",
            availability: {
                "2025-02-24": ["6:00 PM"],
                "2025-02-25": ["7:00 AM"],
                "2025-02-26": ["7:00 AM", "8:00 AM"],
                "2025-02-27": ["5:00 PM"],
                "2025-02-28": ["6:00 PM"]
            }
        },
    ];

    const initialHistory = [
        { id: 1, name: "Alex Brown", email: "alex@example.com", date: "2025-02-20", trainerId: 1, timeSlot: "9:00 AM", status: "Completed", notes: "Focus on upper body" },
        { id: 2, name: "Alex Brown", email: "alex@example.com", date: "2025-02-22", trainerId: 2, timeSlot: "7:00 AM", status: "Completed", notes: "Gentle stretching" },
    ];

    const [formData, setFormData] = useState({
        name: '', email: '', date: '', trainerId: '', timeSlot: '', notes: '', recurring: false, recurringWeeks: 1, priority: false
    });
    const [bookings, setBookings] = useState([]);
    const [history, setHistory] = useState(initialHistory);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [paymentTrainer, setPaymentTrainer] = useState(null);
    const [,] = useState("2025-02-26");
    const [trainerFilter, setTrainerFilter] = useState("All");
    const [emailPreview, setEmailPreview] = useState(null);

    const weekDays = ["2025-02-23", "2025-02-24", "2025-02-25", "2025-02-26", "2025-02-27", "2025-02-28", "2025-03-01"];
    const availableTrainers = trainerFilter === "All" ? trainers : trainers.filter(t => t.id === parseInt(trainerFilter));
    const availableSlots = formData.trainerId && formData.date
        ? trainers.find(t => t.id === parseInt(formData.trainerId))?.availability[formData.date] || []
        : [];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'trainerId' || name === 'date' ? { timeSlot: '' } : {})
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newBookings = [];
        if (formData.recurring) {
            for (let i = 0; i < parseInt(formData.recurringWeeks); i++) {
                const newDate = new Date(formData.date);
                newDate.setDate(newDate.getDate() + i * 7);
                const dateString = newDate.toISOString().split('T')[0];
                if (trainers.find(t => t.id === parseInt(formData.trainerId))?.availability[dateString]?.includes(formData.timeSlot)) {
                    newBookings.push({ ...formData, id: Date.now() + i, date: dateString });
                }
            }
        } else {
            newBookings.push({ ...formData, id: Date.now() });
        }
        setBookings([...bookings, ...newBookings]);
        setPaymentTrainer(newBookings[0]);
        setEmailPreview(newBookings[0]); // Show email preview for first booking
    };

    const completePayment = () => {
        console.log('Payment processed for:', paymentTrainer);
        setShowConfirmation(true);
        setTimeout(() => {
            setShowConfirmation(false);
            setHistory(prev => [...prev, ...bookings.filter(b => b.id === paymentTrainer.id).map(b => ({ ...b, status: 'Confirmed' }))]);
            setBookings(prev => prev.filter(b => b.id !== paymentTrainer.id));
            setPaymentTrainer(null);
            setEmailPreview(null);
        }, 2000);
    };

    const cancelBooking = (bookingId) => {
        setBookings(bookings.filter(booking => booking.id !== bookingId));
    };

    const cancelHistory = (historyId) => {
        setHistory(history.filter(h => h.id !== historyId));
    };

    return (
        <div className="booking">
            <h2>Book a Class or Session</h2>
            <p className="booking-intro">Schedule your next workout with ease—choose your trainer and time!</p>

            {/* Trainer Availability Filter */}
            <section className="trainer-filter">
                <h3><FaFilter /> Filter Trainers</h3>
                <select value={trainerFilter} onChange={(e) => setTrainerFilter(e.target.value)}>
                    <option value="All">All Trainers</option>
                    {trainers.map(trainer => (
                        <option key={trainer.id} value={trainer.id}>{trainer.name} ({trainer.specialty})</option>
                    ))}
                </select>
            </section>

            {/* Trainer Availability Calendar */}
            <section className="trainer-calendar">
                <h3>Trainer Availability</h3>
                <div className="calendar-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Trainer</th>
                                {weekDays.map((day, index) => (
                                    <th key={index}>{new Date(day).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {availableTrainers.map(trainer => (
                                <tr key={trainer.id}>
                                    <td>{trainer.name}</td>
                                    {weekDays.map((day, index) => (
                                        <td key={index}>{trainer.availability[day]?.length > 0 ? trainer.availability[day][0] : '-'}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Booking Form */}
            <section className="booking-form-section">
                <form onSubmit={handleSubmit} className="booking-form">
                    <div className="form-group">
                        <label>Name:</label>
                        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} min="2025-02-23" required />
                    </div>
                    <div className="form-group">
                        <label>Trainer:</label>
                        <select name="trainerId" value={formData.trainerId} onChange={handleChange} required>
                            <option value="">Select a Trainer</option>
                            {availableTrainers.map(trainer => (
                                <option key={trainer.id} value={trainer.id}>{trainer.name} ({trainer.specialty})</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Time Slot:</label>
                        <select name="timeSlot" value={formData.timeSlot} onChange={handleChange} required disabled={!formData.trainerId || !formData.date}>
                            <option value="">Select a Time</option>
                            {availableSlots.map((slot, index) => (
                                <option key={index} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Notes:</label>
                        <textarea name="notes" placeholder="Add any special requests or notes..." value={formData.notes} onChange={handleChange} />
                    </div>
                    <div className="form-group recurring-group">
                        <label>
                            <input type="checkbox" name="recurring" checked={formData.recurring} onChange={handleChange} />
                            Recurring Booking
                        </label>
                        {formData.recurring && (
                            <select name="recurringWeeks" value={formData.recurringWeeks} onChange={handleChange}>
                                {[1, 2, 3, 4].map(weeks => (
                                    <option key={weeks} value={weeks}>{weeks} Week{weeks > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        )}
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" name="priority" checked={formData.priority} onChange={handleChange} />
                            Priority Booking (Faster Confirmation)
                        </label>
                    </div>
                    <button type="submit" className="book-now-btn">Book Now</button>
                </form>
            </section>

            {/* Current Bookings */}
            <section className="booking-summary">
                <h3>Current Bookings</h3>
                {bookings.length === 0 ? (
                    <p>No current bookings. Schedule one above!</p>
                ) : (
                    <div className="booking-list">
                        {bookings.map(booking => (
                            <div key={booking.id} className="booking-card">
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Email:</strong> {booking.email}</p>
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Trainer:</strong> {trainers.find(t => t.id === parseInt(booking.trainerId))?.name}</p>
                                <p><strong>Time:</strong> {booking.timeSlot}</p>
                                {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                                {booking.recurring && <p><strong>Recurring:</strong> {booking.recurringWeeks} weeks</p>}
                                {booking.priority && <p><strong>Priority:</strong> Yes</p>}
                                <button className="cancel-btn" onClick={() => cancelBooking(booking.id)}><FaTimes /> Cancel</button>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Booking Notes History */}
            <section className="notes-history">
                <h3><FaStickyNote /> Booking Notes History</h3>
                {history.filter(h => h.notes).length === 0 ? (
                    <p>No notes in history yet.</p>
                ) : (
                    <div className="notes-list">
                        {history.filter(h => h.notes).map(booking => (
                            <div key={booking.id} className="note-card">
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Trainer:</strong> {trainers.find(t => t.id === parseInt(booking.trainerId))?.name}</p>
                                <p><strong>Notes:</strong> {booking.notes}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Booking History */}
            <section className="booking-history">
                <h3>Booking History</h3>
                {history.length === 0 ? (
                    <p>No booking history yet.</p>
                ) : (
                    <div className="history-list">
                        {history.map(booking => (
                            <div key={booking.id} className="history-card">
                                <p><strong>Name:</strong> {booking.name}</p>
                                <p><strong>Date:</strong> {booking.date}</p>
                                <p><strong>Trainer:</strong> {trainers.find(t => t.id === parseInt(booking.trainerId))?.name}</p>
                                <p><strong>Time:</strong> {booking.timeSlot}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                                {booking.notes && <p><strong>Notes:</strong> {booking.notes}</p>}
                                {booking.recurring && <p><strong>Recurring:</strong> {booking.recurringWeeks} weeks</p>}
                                {booking.priority && <p><strong>Priority:</strong> Yes</p>}
                                {booking.status !== "Completed" && (
                                    <button className="cancel-btn" onClick={() => cancelHistory(booking.id)}><FaTimes /> Cancel</button>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Payment Modal */}
            {paymentTrainer && (
                <div className="payment-modal" onClick={() => setPaymentTrainer(null)}>
                    <div className="payment-content" onClick={e => e.stopPropagation()}>
                        <h3>Payment for {trainers.find(t => t.id === parseInt(paymentTrainer.trainerId))?.name}</h3>
                        <p><strong>Date:</strong> {paymentTrainer.date}</p>
                        <p><strong>Time:</strong> {paymentTrainer.timeSlot}</p>
                        <p><strong>Amount:</strong> ${paymentTrainer.priority ? 75 : 50} {paymentTrainer.recurring ? `x ${bookings.filter(b => b.recurring === paymentTrainer.recurring).length}` : ''} (Demo)</p>
                        <button className="pay-btn" onClick={completePayment}><FaCreditCard /> Pay Now</button>
                        <button className="cancel-btn" onClick={() => setPaymentTrainer(null)}><FaTimes /> Cancel</button>
                    </div>
                </div>
            )}

            {/* Confirmation Popup */}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <div className="confirmation-content">
                        <FaCheck className="check-icon" />
                        <p>Booking confirmed! Check your email for details.</p>
                    </div>
                </div>
            )}

            {/* Email Preview */}
            {emailPreview && (
                <div className="email-preview-modal" onClick={() => setEmailPreview(null)}>
                    <div className="email-preview-content" onClick={e => e.stopPropagation()}>
                        <h3>Email Preview</h3>
                        <p><strong>To:</strong> {emailPreview.email}</p>
                        <p><strong>Subject:</strong> Booking Confirmation - GymFit</p>
                        <p><strong>Message:</strong></p>
                        <p>Dear {emailPreview.name},</p>
                        <p>Your booking with {trainers.find(t => t.id === parseInt(emailPreview.trainerId))?.name} on {emailPreview.date} at {emailPreview.timeSlot} has been received.</p>
                        {emailPreview.notes && <p><strong>Notes:</strong> {emailPreview.notes}</p>}
                        {emailPreview.priority && <p><strong>Priority:</strong> Expedited confirmation requested.</p>}
                        <p>Thank you for choosing GymFit!</p>
                        <button className="close-preview-btn" onClick={() => setEmailPreview(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Booking;