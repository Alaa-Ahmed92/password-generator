import React, { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';

import './App.css';

function App() {
  // Characters Variables
  let lowercase = "abcdefghijklmnopqrstuvwxyz";
  let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let numbers = "0123456789";
  let symbols = "!@#$%^&*()_+-=[]{}|;:'\",.<>/?\\";

  // Checkboxes
  let options = [
    { label: "Include Uppercase Letters", name: "uppercase" },
    { label: "Include Lowercase Letters", name: "lowercase" },
    { label: "Include Numbers", name: "numbers" },
    { label: "Include Symbols", name: "symbols" },
  ];

  // Generated Password
  const [password, setPassword] = useState("Password");
  // Choosed Characters
  const [chars, setChars] = useState([]);
  // Checked Items
  const [checkedItems, setCheckedItems] = useState([]);
  // Range Value
  const [range, setRange] = useState(0);
  // Errors
  const [error, setError] = useState({});
  // Strength Levels
  const [strength, setStrength] = useState('');

  // Generate Password
  const generatePassword = () => {
    let charsString = chars.join('');
    let pass = '';
    for (let index = 0; index < range; index++) {
      pass += charsString.charAt(Math.floor(Math.random() * charsString.length));
    }
    setPassword(pass);
  }

  // Copy Content
  const copyContent = () => {
    navigator.clipboard.writeText(password);
    alert(`${password} Copied!`);
  }

  // Handle Range Slider
  const handleRangeChange = (e) => {
    setRange(e.target.value);
  };

  // Handle Select Checkboxes
  const handleSelectChange = (e) => {
    const item = e.target.value;

    if (e.target.checked) {
      setCheckedItems((prev) => [...prev, item]);
      switch (item) {
        case "uppercase":
          setChars((prev) => [...prev, uppercase])
          break;
        case "lowercase":
          setChars((prev) => [...prev, lowercase])
          break;
        case "numbers":
          setChars((prev) => [...prev, numbers])
          break;
        case "symbols":
          setChars((prev) => [...prev, symbols])
          break;
        default:
          setChars("")
          break;
      }
    } else {
      setCheckedItems((prev) => prev.filter((i) => i !== item));
      switch (item) {
        case "uppercase":
          setChars((prev) => prev.filter((i) => i !== uppercase))
          break;
        case "lowercase":
          setChars((prev) => prev.filter((i) => i !== lowercase))
          break;
        case "numbers":
          setChars((prev) => prev.filter((i) => i !== numbers))
          break;
        case "symbols":
          setChars((prev) => prev.filter((i) => i !== symbols))
          break;
        default:
          setChars("")
          break;
      }
    }
  };

  // Validation
  const validate = () => {
    let errs = {};
    if (range < 6) errs.range = "Password should be more than 6 chars"
    if (checkedItems.length === 0) errs.checkboxes = "Choose at least 1 checkbox"

    return errs;
  }

  // Handle Strength Levels
  const handleStrength = () => {
    switch (checkedItems.length) {
      case 1:
        setStrength('Weak')
        break;
      case 2:
        setStrength('Easy')
        break;
      case 3:
        setStrength('Medium')
        break;
      case 4:
        setStrength('Strong')
        break;
      default:
        setStrength('')
        break;
    }
  }

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length === 0) {
      generatePassword();
      handleStrength();
      setError({});
    } else {
      setError({ errs });
    }
  }


  return (
    <div className='pgBox'>
      <div className="pgWrapper">
        <h3 className="pgWrapperTitle">Password Generator</h3>
        <div className="pgScreen">
          <span className='pgPassword'>{password}</span>
          <span className='pgCopyIcon' onClick={copyContent}><FaRegCopy /></span>
        </div>
        <div className="pgContent">
          <div className="pgCharLength">
            <div className="pgCharLengthHead">
              <h4>Character Length</h4>
              <span>{range}</span>
            </div>
            <div className="pgCharLengthRange">
              <input
                max={20}
                onChange={handleRangeChange}
                value={range}
                type="range"
                className="sliderRange"
              />
            </div>
          </div>
          <div className="pgCheckboxes">
            {options.map((item, index) => (
              <div key={index} className="pgCheckbox">
                <label className="checkboxContainer">
                  <input
                    onChange={handleSelectChange}
                    value={item.name}
                    checked={checkedItems.includes(item.name)}
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                  {item.label}
                </label>
              </div>
            ))}
          </div>
          <div className="pgStrength">
            <h4>Strength</h4>
            <div className="pgStrengthLevel">
              <h5>{strength}</h5>
              <div className="pgStrengthBar">
                <div className={strength}></div>
                <div className={strength}></div>
                <div className={strength}></div>
                <div className={strength}></div>
              </div>
            </div>
          </div>
          <div className="pgGenerate">
            <button onClick={handleSubmit}>GENERATE!</button>
          </div>
        </div>
        {error.errs && (
          <ul>
            {Object.entries(error.errs).map(([key, value]) => (
              <li className='error' key={key}>{value}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
