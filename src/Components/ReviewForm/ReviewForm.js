import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [feedbackGiven, setFeedbackGiven] = useState([false, false]); // Track feedback for doctors
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Track selected doctor for feedback
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    rating: 0,
  });
  const [submittedMessage, setSubmittedMessage] = useState(null); // Store submitted feedback message
  const [showWarning, setShowWarning] = useState(false); // Show warning if required fields aren't filled

  const handleFeedbackClick = (index) => {
    setSelectedDoctor(index); // Set the doctor selected for feedback
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e) => {
    setFormData({ ...formData, rating: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.review && formData.rating > 0) {
      const newFeedbackGiven = [...feedbackGiven];
      newFeedbackGiven[selectedDoctor] = true; // Disable the feedback button for the doctor
      setFeedbackGiven(newFeedbackGiven);
      setSubmittedMessage(formData);
      setFormData({ name: '', review: '', rating: 0 });
      setShowWarning(false);
      setSelectedDoctor(null); // Close the form after submission
    } else {
      setShowWarning(true); // Show warning if form is incomplete
    }
  };

  return (
    <div className="review-form-container">
      <h2>Provide Feedback for Your Consultation</h2>
      <table className="review-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dr. John Doe</td>
            <td>Cardiology</td>
            <td>
              <button
                disabled={feedbackGiven[0]}
                onClick={() => handleFeedbackClick(0)}
                className="feedback-button"
              >
                {feedbackGiven[0] ? 'Feedback Submitted' : 'Click Here'}
              </button>
            </td>
            <td>{feedbackGiven[0] ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Dr. Jane Smith</td>
            <td>Dermatology</td>
            <td>
              <button
                disabled={feedbackGiven[1]}
                onClick={() => handleFeedbackClick(1)}
                className="feedback-button"
              >
                {feedbackGiven[1] ? 'Feedback Submitted' : 'Click Here'}
              </button>
            </td>
            <td>{feedbackGiven[1] ? 'Yes' : 'No'}</td>
          </tr>
        </tbody>
      </table>

      {selectedDoctor !== null && (
        <div className="feedback-form">
          <h2>Give Your Feedback</h2>
          {showWarning && <p className="warning">Please fill out all fields.</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="review">Review:</label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleRatingChange}
              >
                <option value="0">Select Rating</option>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}

      {submittedMessage && (
        <div className="submitted-message">
          <h3>Submitted Feedback:</h3>
          <p><strong>Name:</strong> {submittedMessage.name}</p>
          <p><strong>Review:</strong> {submittedMessage.review}</p>
          <p><strong>Rating:</strong> {submittedMessage.rating} Stars</p>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
