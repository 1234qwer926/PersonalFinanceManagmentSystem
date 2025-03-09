import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../PageCss/Register.css";

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData);
            toast.success(response.data.message);
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up</h2>

                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>
            <br />
        </div>
    );
};

export default Register;
