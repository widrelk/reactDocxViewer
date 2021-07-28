import React, { useState }from "react";
import logo from './logo.svg';
import './App.css';
import DocxViewer from './DocxViewer';

function App() {
  const [docxFile, setDocxFile] = useState(null)
  fetch("test1.docx", {}).then(response => response.blob())
        .then(blob => blob.arrayBuffer())
        .then(arrayBuffer => {
          setDocxFile(arrayBuffer)
        })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DocxViewer width="1000px" height="800px" blob={ docxFile }></DocxViewer>
    </div>
  );
}

export default App;
