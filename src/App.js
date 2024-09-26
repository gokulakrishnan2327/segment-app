import React, { useState } from "react";
import SegmentForm from "./SegmentForm";
import "./App.css";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  return (
    <div className="App">
      <button onClick={handleButtonClick}>Save Segment</button>
      {showPopup && <SegmentForm onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default App;
