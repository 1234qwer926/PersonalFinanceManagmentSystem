import React from "react";
import Squares from "./Squares";
import "../PageCss/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-wrapper">
        <Squares 
          speed={0.5} 
          squareSize={40}
          direction="diagonal"
          borderColor="rgba(255, 255, 255, 0.2)" 
          hoverFillColor="#222"
        />
        <header className="hero">
          <h1>Manage Your Finances with Ease</h1>
          <p>Track your income, expenses, and savings effortlessly.</p>
          <button className="cta-btn">Get Started</button>
        </header>
      </div>

      <section className="features">
        <div className="feature-card">
          <h2>Track Expenses</h2>
          <p>Monitor your daily spending and stay on top of your budget.</p>
        </div>
        <div className="feature-card">
          <h2>Manage Income</h2>
          <p>Keep a record of all your earnings in one place.</p>
        </div>
        <div className="feature-card">
          <h2>Analyze Trends</h2>
          <p>Gain insights into your financial habits and plan wisely.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
