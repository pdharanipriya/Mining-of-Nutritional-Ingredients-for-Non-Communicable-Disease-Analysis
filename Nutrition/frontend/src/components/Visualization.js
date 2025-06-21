import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import styles from "./Visualization.module.css";
import axios from "axios";

const Visualization = () => {
    const location = useLocation();
    const { items } = location.state || {};
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!items || items.length === 0) {
            setError("No food items provided.");
            setLoading(false);
            return;
        }

        axios
            .post("http://localhost:5000/calculate-intake", { items }) // Modified to send item list
            .then((response) => {
                console.log("🔍 API Response:", response.data);
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("❌ Error fetching intake data:", error);
                setError("Failed to fetch data. Please try again.");
                setLoading(false);
            });
    }, [items]);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Nutrient Intake Analysis</h2>

            {loading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {data && !loading && !error && (
                <>
                    {/* List of Foods & Quantities */}
                    <div className={styles.foodInfo}>
                        <h3>🧾 Foods Consumed:</h3>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index}>🍴 {item.food} - {item.quantity}g</li>
                            ))}
                        </ul>
                    </div>

                    {/* Exceeded Nutrients & NCD Risks */}
                    {data.exceededNutrients.length > 0 ? (
                        <div className={styles.nutrientsContainer}>
                            <h3 className={styles.subHeading}>🚨 Exceeded Nutrients & Associated Risks</h3>
                            {data.exceededNutrients.map((nutrient, index) => (
                                <div key={index} className={styles.nutrientCard}>
                                    <h4>⚠ {nutrient}</h4>
                                    <p>Intake: <strong>{data.intakeValues[nutrient].toFixed(2)} mg</strong></p>
                                    <p>Toxicity Limit: <strong>{data.safeLimits[nutrient].toFixed(2)} mg</strong></p>
                                    <p className={styles.ncdRisk}>🩺 Risk: {data.associatedNCDs[nutrient]}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={styles.safeMessage}>✅ All nutrient levels are within safe limits!</p>
                    )}

                    
                    {data.exceededNutrients.length > 0 && (
                        <div className={styles.chartContainer}>
                            <h3 className={styles.subHeading}>📊 Intake vs. Toxicity Limits</h3>

                            <Bar
                                data={{
                                    labels: data.exceededNutrients,
                                    datasets: [
                                        {
                                            label: "Your Intake",
                                            data: data.exceededNutrients.map(n => data.intakeValues[n]),
                                            backgroundColor: "rgba(255, 99, 132, 0.6)",
                                        },
                                        {
                                            label: "Toxicity Limit",
                                            data: data.exceededNutrients.map(n => data.safeLimits[n]),
                                            backgroundColor: "rgba(54, 162, 235, 0.6)",
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: false,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { beginAtZero: true },
                                    },
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Visualization;

