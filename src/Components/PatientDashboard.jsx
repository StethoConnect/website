import React from 'react';
import Card from './Card'; // Assuming you have the Card component in the same directory

function PatientDashboard() {
  const patientInfo = {
    name: "John Doe",
    age: "30",
    lastVisit: "2023-01-01"
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">Patient Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Patient Name" content={patientInfo.name} />
        <Card title="Age" content={patientInfo.age} />
        <Card title="Last Visit" content={patientInfo.lastVisit} />
        {/* Add more cards as needed */}
      </div>
    </div>
  );
}

export default PatientDashboard;
