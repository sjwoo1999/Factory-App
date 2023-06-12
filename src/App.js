import React from "react";
import "./App.css";
import Floor1 from "./components/Floor1";
import Floor2 from "./components/Floor2";

const App = () => {
  return (
    <div className="App">
      <h1>Factory App</h1>
      <Floor1 />
      <Floor2 />
    </div>
  );
};

export default App;
