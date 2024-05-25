import image from "./assets/copy-icon.png";
import "./App.css";
import { useRef, useState } from "react";

function App() {
  const [checkItems, setCheckItems] = useState([]);
  const inputRef = useRef(null);
  const inputLength = useRef(null);

  function handleCheckboxChange(event) {
    const value = event.target.value;

    if (event.target.checked) {
      setCheckItems([...checkItems, value]);
    } else setCheckItems(checkItems.filter((item) => item !== value));
    console.log(checkItems);
  }

  function passwordGenerator() {
    if (checkItems.length === 0) {
      alert("---All checks are empty---");
    } else {
      const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowerCaseletters = "abcdefghijklmnopqrstuvwxyz";
      const numbers = "0123456789";
      const symbols = "~`_-+=,./';[]{}:\"<>?||!@#$%^&*()";

      let finalString = "";
      let generatedpassword = "";

      if (checkItems.includes("uppercase")) {
        console.log("yes");
        finalString += upperCaseLetters;
      }

      if (checkItems.includes("lowercase")) {
        finalString += lowerCaseletters;
      }

      if (checkItems.includes("numbers")) {
        finalString += numbers;
      }

      if (checkItems.includes("symbols")) {
        finalString += symbols;
      }
      console.log(finalString);

      for (let i = 0; i < inputLength.current.value; i++) {
        const randomNumber = Math.floor(Math.random() * finalString.length) + 1;
        generatedpassword += finalString.charAt(randomNumber);
      }
      console.log(generatedpassword);
      inputRef.current.value = generatedpassword;
    }
  }

  const handleCopy = () => {
    const inputValue = inputRef.current.value;
    navigator.clipboard
      .writeText(inputValue)
      .then(() => {
        console.log("Text copied to clipboard:", inputValue);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };
  return (
    <div className="section">
      <h1>Password Generator</h1>
      <div className="inputField">
        <input type="text" ref={inputRef} />
        <div
          onClick={handleCopy}
          style={{
            backgroundColor: "#116BB4",
            marginLeft: "0.2rem",
            borderRadius: "4px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "30px",
            height: "32px",
          }}
        >
          <img
            src={image}
            alt=""
            style={{ width: "20px", backgroundColor: "white" }}
          />
        </div>
      </div>
      <div className="lengthBox">
        <label htmlFor="password-length">
          Select Password length<strong>(**8-50 characters**)</strong>
        </label>
        <input
          type="number"
          defaultValue={8}
          name="password-length"
          ref={inputLength}
        />
      </div>
      <div className="typeOfPassword">
        <div>
          <input
            type="checkbox"
            name="upper-case"
            id="uppercase"
            value="uppercase"
            checked={checkItems.includes("uppercase")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="uppercase">Include Upper Case</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="lower-case"
            id="lowercase"
            value="lowercase"
            checked={checkItems.includes("lowercase")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="lowercase">Include Lower Case</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="numbers"
            id="numbers"
            value="numbers"
            checked={checkItems.includes("numbers")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="numbers">Include Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            name="symbols"
            id="symbols"
            value="symbols"
            checked={checkItems.includes("symbols")}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="symbols">Include Symbols</label>
        </div>
        <button onClick={() => passwordGenerator()}>Generate Password</button>
      </div>
    </div>
  );
}

export default App;
