import "./App.css";
import Viewer from "./components/viewer";
import Controller from "./components/controller";
import Even from "./components/even";
import { useState, useEffect, useRef } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [input, setInput] = useState("");
  const isMount = useRef(false);

  // 의존성 배열
  // dependency array
  // deps

  // 1. 마운트: 탄생
  useEffect(() => {
    console.log("mount");
  }, []);
  // 2. 업데이트: 변화, 리렌더링
  useEffect(() => {
    if (!isMount.current) {
      isMount.current = true;
      return;
    }
    console.log("update");
  }, []);
  // 3. 언마운트: 죽음
  useEffect(() => {}, []);

  const onClickButton = (value) => {
    setCounter(counter + value);
  };

  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </section>
      <section>
        <Viewer counter={counter} />
        {counter % 2 === 0 ? <Even /> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton} />
      </section>
    </div>
  );
}

export default App;
