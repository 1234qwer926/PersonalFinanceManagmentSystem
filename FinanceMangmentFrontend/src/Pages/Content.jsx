import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../PageCss/Explore.css";
import { Link } from "react-router-dom";

const Content = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [filters, setFilters] = useState({
    date: "",
    title: "",
    type: "",
    catalog: "",
  });

  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please log in first.");
        navigate("/login");
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTransactions(response.data);
      setFilteredTransactions(response.data); 
    } catch (error) {
      console.error("Error fetching transactions:", error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please log in first.");
        navigate("/login");
        return;
      }

      await axios.delete(`http://localhost:5000/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const updatedTransactions = transactions.filter(
        (transaction) => transaction._id !== id
      );
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions); 
      toast.success("Transaction deleted successfully!");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Failed to delete transaction. Please try again.");
    }
  };

  const handleEdit = (transaction) => {
    navigate(`/edit-finance/${transaction._id}`, { state: { transaction } });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let filtered = transactions;

    if (filters.date) {
      filtered = filtered.filter((t) => t.date === filters.date);
    }
    if (filters.title) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(filters.title.toLowerCase())
      );
    }
    if (filters.type) {
      filtered = filtered.filter((t) => t.type === filters.type);
    }
    if (filters.catalog) {
      filtered = filtered.filter((t) => t.catalog === filters.catalog);
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions]);

  return (
    <div className="explore-container">
      <div className="filter-container">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          placeholder="Filter by Date"
        />
        <input
          type="text"
          name="title"
          value={filters.title}
          onChange={handleFilterChange}
          placeholder="Search by Title"
        />
        <select name="type" value={filters.type} onChange={handleFilterChange}>
          <option value="">Filter by Type</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>
        <select
          name="catalog"
          value={filters.catalog}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Catalog</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
        </select>
        <button className="add-btn">
          <Link to="/AddFinance" className="link-btn">
            + Add
          </Link>
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Catalog</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>
                    {new Date(transaction.date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  <td>{transaction.title}</td>
                  <td>${transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.catalog}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(transaction)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(transaction._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
