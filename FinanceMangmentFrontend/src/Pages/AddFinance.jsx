import React, { useState } from "react";
import "../PageCss/AddFinance.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddFinance = () => {
  const navigate = useNavigate();
  const [financeData, setFinanceData] = useState({
    date: "",
    title: "",
    amount: "",
    type: "",
    catalog: "",
  });

  const [error, setError] = useState(""); 

  // Handle input changes
  const handleChange = (e) => {
    setFinanceData({ ...financeData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); 
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/transactions", financeData, {
        headers: {
          Authorization: `Bearer ${token}`, 
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Finance record added successfully!");
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error adding finance record:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Failed to add record. Please try again.");
    }
  };

  return (
    <div className="add-finance-container">
      <h2>Add Finance Record</h2>
      {error && <p className="error-message">{error}</p>} 
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input type="date" name="date" value={financeData.date} onChange={handleChange} required />

        <label>Title</label>
        <input type="text" name="title" placeholder="Enter title" value={financeData.title} onChange={handleChange} required />

        <label>Amount</label>
        <input type="number" name="amount" placeholder="Enter amount" value={financeData.amount} onChange={handleChange} required />

        <label>Type</label>
        <select name="type" value={financeData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <label>Catalog</label>
        <select name="catalog" value={financeData.catalog} onChange={handleChange} required>
          <option value="">Select Catalog</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
        </select>

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddFinance;
