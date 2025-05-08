import React from "react";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Hospital ERP Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Patients Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total Patients
            </h2>
            <p className="text-2xl font-bold text-primary">1,245</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-7-7l7 7-7 7"
              />
            </svg>
          </div>
        </div>

        {/* Total Appointments Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Total Appointments
            </h2>
            <p className="text-2xl font-bold text-secondary">320</p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5h18M3 19h18M4 5l1 1m15 0l1-1m-1 14l1 1m-15 0l1-1"
              />
            </svg>
          </div>
        </div>

        {/* Doctors Available Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Doctors Available
            </h2>
            <p className="text-2xl font-bold text-primary">15</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 3v18M3 12h18"
              />
            </svg>
          </div>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Pending Orders
            </h2>
            <p className="text-2xl font-bold text-secondary">12</p>
          </div>
          <div className="p-4 bg-secondary/10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0h-3"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Activity Chart Placeholder */}
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Recent Activity
        </h2>
        <div className="bg-gray-200 h-48 rounded-lg">
          {/* You can later add a chart here using libraries like Chart.js or Recharts */}
        </div>
      </div>
    </div>
  );
}
