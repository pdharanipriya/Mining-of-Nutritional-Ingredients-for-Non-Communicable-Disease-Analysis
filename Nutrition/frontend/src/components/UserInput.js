import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./UserInput.module.css";

const UserInput = () => {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [foods, setFoods] = useState([]);
    const [selectedFood, setSelectedFood] = useState("");
    const [quantity, setQuantity] = useState("");
    const [items, setItems] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:5000/categories")
            .then(response => setCategories(response.data))
            .catch(error => console.error("❌ Error fetching categories:", error));
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            const encodedCategory = encodeURIComponent(selectedCategory);
            axios.get(`http://localhost:5000/foods?category=${encodedCategory}`)
                .then(response => setFoods(response.data))
                .catch(error => console.error("❌ Error fetching foods:", error));
        } else {
            setFoods([]);
        }
    }, [selectedCategory]);

    const handleAddItem = () => {
        if (!selectedCategory || !selectedFood || !quantity || quantity <= 0) {
            setError("⚠️ Please fill all fields correctly.");
            return;
        }

        const newItem = { food: selectedFood, quantity: parseFloat(quantity) };
        setItems([...items, newItem]);
        setSelectedCategory("");
        setSelectedFood("");
        setQuantity("");
        setError("");
    };

    const handleRemoveItem = (index) => {
        const newList = [...items];
        newList.splice(index, 1);
        setItems(newList);
    };

    const handleSubmit = () => {
        if (items.length === 0) {
            setError("⚠️ Please add at least one food item.");
            return;
        }

        navigate("/visualization", { state: { items } });
    };

    return (
        <div className={styles.container}>
            <h2>Enter Your Food Intake</h2>

            {error && <p className={styles.error}>{error}</p>}

            <label>Category:</label>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.select}
            >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
            </select>

            <label>Food:</label>
            <select
                value={selectedFood}
                onChange={(e) => setSelectedFood(e.target.value)}
                className={styles.select}
                disabled={!selectedCategory}
            >
                <option value="">Select a food</option>
                {foods.map((food) => (
                    <option key={food} value={food}>{food}</option>
                ))}
            </select>

            <label>Quantity (grams):</label>
            <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.input}
                min="1"
            />

            <button onClick={handleAddItem} className={styles.button}>Add Food</button>

            {items.length > 0 && (
                <div className={styles.listSection}>
                    <h3>🧾 Selected Foods</h3>
                    <ul className={styles.list}>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.food} - {item.quantity}g
                                <button onClick={() => handleRemoveItem(index)} className={styles.removeButton}>❌</button>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleSubmit} className={styles.button}>Calculate Intake</button>
                </div>
            )}
        </div>
    );
};

export default UserInput;
