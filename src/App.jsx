import React, { useState } from "react";
import "./App.css";
import { AppRoutes } from "./constant/AppRoutes";
import Button from "./components/Button";
import { useNavigate } from "react-router";

export default function App() {
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // You can add further actions like API calls here

    const response = await fetch(AppRoutes.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log(response);
  };

  return (
    <>
      <div>
        <div className="mx-auto border border-black w-100">
          <Button
            onClick={() => navigate("/dashboard")}
            text={"Go To Dashboard"}
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 shadow rounded"
        >
          <div className="mb-2">
            <label className="block">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="mb-2">
            <label className="block">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="border w-full p-2 rounded"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
