import React from 'react';

function CollegeCard({ college }) {
  return (
    <div className="college-card">
      <h3 className="college-name">{college.name}</h3>
      <div className="college-details">
        <p className="college-city">
          <span className="label">📍 City:</span> {college.city}
        </p>
        <p className="college-course">
          <span className="label">📚 Course:</span> {college.course}
        </p>
      </div>
      <p className="college-description">{college.description}</p>
    </div>
  );
}

export default CollegeCard;