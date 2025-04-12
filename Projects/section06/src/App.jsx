import "./App.css";
import Viewer from "./components/viewer";
import Controller from "./components/controller";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  const onClickButton = (value) => {
    setCounter(counter + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer counter={counter} />
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
