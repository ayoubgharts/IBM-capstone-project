import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; // Import CSS file for styles

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [showNotification, setShowNotification] = useState(true); // Controls the visibility of the notification

  // useEffect hook to load user, doctor, and appointment data from storage
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
    const storedAppointmentData = JSON.parse(localStorage.getItem(storedDoctorData?.name));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }
    if (storedDoctorData) {
      setDoctorData(storedDoctorData);
    }
    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  // Event handler for appointment cancellation (this can be called when user cancels appointment)
  const handleCancelAppointment = () => {
    // Clear appointment data from state and localStorage
    localStorage.removeItem(doctorData?.name);
    setAppointmentData(null);
    setShowNotification(false); // Hide notification when appointment is canceled
  };

  // Return JSX to display the notification with appointment details
  return (
    <div>
      <Navbar /> {/* Render Navbar component */}
      {children}
      {/* Display notification only if user is logged in, appointment data exists, and showNotification is true */}
      {
        <div className="notification">
          <div className="notification__content">
            <h3 className="notification__title">Appointment Details</h3>
            <p><strong>User:</strong> {username}</p>
            <p><strong>Doctor:</strong> {doctorData?.name}</p>
            <p><strong>Date:</strong> {appointmentData?.date}</p>
            <p><strong>Time:</strong> {appointmentData?.time}</p>
            <button className="cancel-button" onClick={handleCancelAppointment}>Cancel Appointment</button>
          </div>
        </div>
      }
    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;
