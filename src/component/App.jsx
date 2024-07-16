import React, { useState } from 'react';
import Popup from './Popup';

function App() {
  let [isPopupOpen, setIsPopupOpen] = useState(false);

  let togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="App">
      <button onClick={togglePopup}>Save segment</button>
      {isPopupOpen && <Popup onClose={togglePopup}></Popup>}
    </div>
  );
}

export default App;
