import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../PageCss/AddFinance.css";

const EditFinance = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { transaction } = location.state || {};

  const [formData, setFormData] = useState({
    date: transaction?.date || "",
    title: transaction?.title || "",
    amount: transaction?.amount || "",
    type: transaction?.type || "",
    catalog: transaction?.catalog || "",
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please log in first.");
        navigate("/login");
        return;
      }

      await axios.put(`http://localhost:5000/api/transactions/${transaction._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Transaction updated successfully!");
      navigate("/"); 
    } catch (error) {
      console.error("Error updating transaction:", error);
      toast.error("Failed to update transaction. Please try again.");
    }
  };

  return (
    <div className="add-finance-container">
      <h2>Edit Finance Record</h2>
      <form onSubmit={handleSubmit}>
        <label>Date</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />

        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Amount</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />

        <label>Type</label>
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <label>Catalog</label>
        <select name="catalog" value={formData.catalog} onChange={handleChange} required>
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
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFinance;
