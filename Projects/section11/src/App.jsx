/* eslint-disable react-hooks/exhaustive-deps */
import { useReducer, useRef, useCallback, createContext, useMemo } from "react";
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

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

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

  const memoizedDispatch = useMemo(() => {
    return { onCreate, onUpdate, onDalete };
  }, []);

  return (
    <>
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </>
  );
}

export default App;
