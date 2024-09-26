import React, { useState } from "react";
import axios from "axios";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const SegmentForm = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(schemaOptions);

  const handleSchemaChange = (index, event) => {
    const newSchemas = [...selectedSchemas];
    newSchemas[index] = event.target.value;
    setSelectedSchemas(newSchemas);
  };

  const handleAddSchema = () => {
    if (availableOptions.length > 0) {
      setSelectedSchemas([...selectedSchemas, availableOptions[0].value]);
      setAvailableOptions(
        availableOptions.filter((option) => option.value !== availableOptions[0].value)
      );
    }
  };

  const handleSaveSegment = async () => {
    const schemaArray = selectedSchemas.map((schema) => {
      const option = schemaOptions.find((opt) => opt.value === schema);
      return { [schema]: option.label };
    });

    const dataToSend = {
      segment_name: segmentName,
      schema: schemaArray,
    };

    try {
      await axios.post("https://webhook.site/45029b56-6b9a-42a1-a11a-ea381f5be826", dataToSend);
      alert("Segment saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving the segment:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Saving Segment</h3>
        <input
          type="text"
          placeholder="Enter the Name of the Segment"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />
  
        <p>To save your segment, you need to add the schemas to build the query.</p>
  
        <div className="blue-box">
          {selectedSchemas.map((schema, index) => (
            <div key={index} className="schema-row">
              <select value={schema} onChange={(e) => handleSchemaChange(index, e)}>
                {schemaOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
  
        <select>
          {availableOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
  
        <button className="add-schema-btn" onClick={handleAddSchema}>+ Add New Schema</button>
  
        <div className="actions">
          <button onClick={handleSaveSegment}>Save the Segment</button>
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}  

export default SegmentForm;
