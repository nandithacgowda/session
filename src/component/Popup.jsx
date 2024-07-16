import React, { useState } from 'react';
import axios from 'axios';

let options = [
  { label: "First Name", value: "Chandu" },
  { label: "Last Name", value: "Donthoju" },
  { label: "Gender", value: "Male" },
  { label: "Age", value: "22" },
  { label: "Account Name", value: "Chandu_donthoju" },
  { label: "City", value: "Rajamundry" },
  { label: "State", value: "Andhra" }
];

let Popup = ({ onClose }) => {
  let [segmentName, setSegmentName] = useState('');
  let [selectedOptions, setSelectedOptions] = useState([]);
  let [availableOptions, setAvailableOptions] = useState(options);

  let handleAddSchema = () => {
    if (availableOptions.length > 0) {
      setSelectedOptions([...selectedOptions, { value: '', id: Date.now() }]);
    }
  };

  let handleSelectChange = (id, value) => {
    let newSelectedOptions = selectedOptions.map(option => {
      if (option.id === id) {
        return { ...option, value };
      }
      return option;
    });
    setSelectedOptions(newSelectedOptions);

    let usedValues = newSelectedOptions.map(option => option.value);
    setAvailableOptions(options.filter(option => !usedValues.includes(option.value)));
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    let schema = selectedOptions.map(option => {
      let selectedOption = options.find(o => o.value === option.value);
      return { [option.value]: selectedOption.label };
    });

    let data = {
      segment_name: segmentName,
      schema: schema,
    };
    try {
      await axios.post(
        "https://webhook.site/132eb409-51df-4250-9592-05144c12ba36",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Data sent successfully");
    } catch (error) {
      console.error("Error sending data", error);
    }
  }
  

  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={onClose}>Close</button>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Segment Name</label>
            <input type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)} />
          </div>
          <div className="schema-box">
            {selectedOptions.map((option, index) => (
             <>
              <select
                key={option.id}
                value={option.value}
                onChange={(e) => handleSelectChange(option.id, e.target.value)}
              >
                <option value="">Add schema to segment</option><br />
                {options.filter(o => !selectedOptions.map(so => so.value).includes(o.value) || o.value === option.value).map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select><br /><br />
              </>
            ))}
          </div>
          <button type="button" onClick={handleAddSchema}>+Add new schema</button><br /><br />
          <button type="submit">Save the segment</button>
        </form>
      </div>
    </div>
  );
};

export default Popup;
