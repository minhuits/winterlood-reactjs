import { useReducer, useRef } from "react";
import "./App.css";
import Editor from "./components/editor";
import Header from "./components/header";
import List from "./components/list";

const mockData = [
  {
    id: 1,
    isDone: false,
    content: "React.js 공부",
    date: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "Next.js 공부",
    date: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];
    case "UPDATE":
      return state.map((item) =>
        item.id === action.tragetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.tragetId);
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const nextId = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: nextId.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  };

  const onUpdate = (tragetId) => {
    dispatch({
      type: "UPDATE",
      tragetId: tragetId,
    });
  };

  // 인수: todos 배열에서 tragetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
  const onDalete = (tragetId) => {
    dispatch({
      type: "DELETE",
      tragetId: tragetId,
    });
  };

  return (
    <>
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDalete={onDalete} />
    </>
  );
}

export default App;
