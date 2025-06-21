import React from "react";
import { Link } from "react-router-dom";
import { FaRobot } from "react-icons/fa"; //chatbot icon
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Welcome to Nutrition Analysis</h1>
          <p className={styles.subtitle}>
            Track your food intake and assess health risks.
          </p>
          <div className={styles.links}>
            <Link to="/user-input" className={styles.button}>
              Enter Food Intake
            </Link>
            <Link to="/ncd-info" className={styles.button}>
              NCD Information
            </Link>
          </div>
        </div>

        {/* Fixed Image URL */}
        <img
        //   src="https://media.istockphoto.com/id/1457433817/photo/group-of-healthy-food-for-flexitarian-diet.jpg?s=612x612&w=0&k=20&c=v48RE0ZNWpMZOlSp13KdF1yFDmidorO2pZTu2Idmd3M="
        src="/foodimage.jpg"  
        alt="Healthy food"
          className={styles.foodImage}
        />
      </div>

      {/* Chatbot Icon Linked to Chatbot Route */}
      <Link to="/chatbot" className={styles.chatbotIcon}>
        <FaRobot size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default Home;
