import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import of the app's components
import ChickenPage from "./components/ChickenPage";
import SingleChickenPage from "./components/SingleChicken";
import CreateChicken from "./components/CreateChicken";

// Main component which defines the routes on which the user can navigate
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChickenPage />} />
        <Route path="/chicken/:id" element={<SingleChickenPage />}/>
        <Route path="/chicken/create" element={<CreateChicken />}/>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
