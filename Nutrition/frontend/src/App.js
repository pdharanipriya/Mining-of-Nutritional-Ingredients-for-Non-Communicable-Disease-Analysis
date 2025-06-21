import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Chatbot from "./components/Chatbot";
import NCDInfo from "./components/NCDInfo";
import UserInput from "./components/UserInput";
import Visualization from "./components/Visualization";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/ncd-info" element={<NCDInfo />} />
        <Route path="/user-input" element={<UserInput />} />
        <Route path="/visualization" element={<Visualization />} />
      </Routes>
    </Router>
  );
}

export default App;
