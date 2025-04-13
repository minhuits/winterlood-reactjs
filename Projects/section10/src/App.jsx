import { useReducer, useRef, useCallback } from "react";
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

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: nextId.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const onUpdate = useCallback((tragetId) => {
    dispatch({
      type: "UPDATE",
      tragetId: tragetId,
    });
  }, []);

  const onDalete = useCallback((tragetId) => {
    dispatch({
      type: "DELETE",
      tragetId: tragetId,
    });
  }, []);

  return (
    <>
      <Header />
      <Editor onCreate={onCreate} />
      <List todos={todos} onUpdate={onUpdate} onDalete={onDalete} />
    </>
  );
}

export default App;
