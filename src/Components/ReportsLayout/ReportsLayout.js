import React from 'react';
import './ReportsLayout.css'; // Import the corresponding CSS for styling

const ReportLayout = () => {
  const reportData = [
    { serialNumber: 1, doctorName: "Dr. John Doe", specialty: "Cardiology" },
    { serialNumber: 2, doctorName: "Dr. Jane Smith", specialty: "Dermatology"},
    // Add more rows as needed
  ];

  return (
    <div className="report-layout-container">
      <h2>Doctor Reports</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Specialty</th>
            <th>View Report</th>
            <th>Download Report</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((report, index) => (
            <tr key={index}>
              <td>{report.serialNumber}</td>
              <td>{report.doctorName}</td>
              <td>{report.specialty}</td>
              <td><button className="feedback-button">View Report</button></td>
              <td><button className="feedback-button">Download Report</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportLayout;
