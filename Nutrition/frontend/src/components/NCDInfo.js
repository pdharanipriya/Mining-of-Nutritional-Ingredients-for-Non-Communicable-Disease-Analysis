import React, { useState, useEffect } from "react";
import "./NCDInfo.css"; // Import CSS

const NCDInfo = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [diseaseData, setDiseaseData] = useState(
    "Non-Communicable Diseases (NCDs) are chronic illnesses that do not spread from person to person. They develop over time due to genetic, environmental, and lifestyle factors. The most common types of NCDs include cardiovascular diseases (such as heart attacks and strokes), diabetes, chronic respiratory diseases (like asthma and COPD), and various cancers. These diseases are largely influenced by risk factors such as unhealthy diets, physical inactivity, tobacco and alcohol use, genetic predisposition, and environmental conditions. The symptoms of NCDs vary depending on the disease but often include fatigue, pain, shortness of breath, and abnormal body functions. If left unmanaged, NCDs can lead to severe complications, disabilities, or even premature death. Prevention and management strategies include maintaining a balanced diet rich in essential nutrients, engaging in regular physical activity, avoiding tobacco and alcohol, undergoing routine health screenings, and practicing stress management techniques like meditation and proper sleep. Globally, NCDs account for approximately 74% of deaths, with low- and middle-income countries being disproportionately affected. Governments and health organizations are implementing policies to encourage healthy lifestyles and reduce the burden of these diseases. Proper nutrition plays a vital role in prevention—consuming a diet rich in proteins, vitamins, minerals, and fiber while avoiding excessive sodium, unhealthy fats, and added sugars can significantly lower the risk of developing NCDs. By adopting a healthier lifestyle and spreading awareness, individuals and communities can take proactive steps toward reducing the impact of these diseases."
  );
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const diseases = [
    "BloodClotDisorder",
    "Boneloss",
    "Diabetes",
    "GastrointestinalIssues",
    "HeartDisease",
    "Hyperkalemia",
    "Hypertension",
    "ImmuneDysfunction",
    "KidneyDamage",
    "LiverDamage",
    "Neuropathy",
    "Obesity",
  ];

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  useEffect(() => {
    if (selectedDisease) {
      setLoading(true);
      setError(null);

      fetch(`/diseases/${selectedDisease}.txt`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to load disease info");
          }
          return response.text();
        })
        .then((text) => {
          setDiseaseData(text);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setDiseaseData(
        "Non-Communicable Diseases (NCDs) are chronic illnesses that do not spread from person to person. They develop over time due to genetic, environmental, and lifestyle factors. The most common types of NCDs include cardiovascular diseases (such as heart attacks and strokes), diabetes, chronic respiratory diseases (like asthma and COPD), and various cancers. These diseases are largely influenced by risk factors such as unhealthy diets, physical inactivity, tobacco and alcohol use, genetic predisposition, and environmental conditions. The symptoms of NCDs vary depending on the disease but often include fatigue, pain, shortness of breath, and abnormal body functions. If left unmanaged, NCDs can lead to severe complications, disabilities, or even premature death. Prevention and management strategies include maintaining a balanced diet rich in essential nutrients, engaging in regular physical activity, avoiding tobacco and alcohol, undergoing routine health screenings, and practicing stress management techniques like meditation and proper sleep. Globally, NCDs account for approximately 74% of deaths, with low- and middle-income countries being disproportionately affected. Governments and health organizations are implementing policies to encourage healthy lifestyles and reduce the burden of these diseases. Proper nutrition plays a vital role in prevention—consuming a diet rich in proteins, vitamins, minerals, and fiber while avoiding excessive sodium, unhealthy fats, and added sugars can significantly lower the risk of developing NCDs. By adopting a healthier lifestyle and spreading awareness, individuals and communities can take proactive steps toward reducing the impact of these diseases."
      );
    }
  }, [selectedDisease]);

  return (
    <div className="container">
      {/* Dark Overlay */}
      <div className={`overlay ${isNavOpen ? "show" : ""}`} onClick={toggleNav}></div>

      {/* Burger Icon */}
      <div className="burger" onClick={toggleNav}>
        <div className={isNavOpen ? "line line1 open" : "line line1"}></div>
        <div className={isNavOpen ? "line line2 open" : "line line2"}></div>
        <div className={isNavOpen ? "line line3 open" : "line line3"}></div>
      </div>

      {/* Side Navigation Bar */}
      <div className={`sidebar ${isNavOpen ? "show" : ""}`}>
        <h3>Diseases</h3>
        <ul>
          {diseases.map((disease) => (
            <li
              key={disease}
              className={selectedDisease === disease ? "active" : ""}
              onClick={() => {
                setSelectedDisease(disease);
                setIsNavOpen(false); // Close sidebar when a disease is selected
              }}
            >
              {disease.replace(/([A-Z])/g, " $1").trim()} {/* Format disease names */}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className={`content ${isNavOpen ? "darkened" : ""}`}>
        <h2>
          {selectedDisease
            ? selectedDisease.replace(/([A-Z])/g, " $1").trim()
            : "Non-Communicable Diseases (NCDs)"}
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <p>{diseaseData}</p>
        )}
      </div>
    </div>
  );
};

export default NCDInfo;
