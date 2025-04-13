import "./App.css";
import Header from "./components/header";
import Editor from "./components/editor";
import List from "./components/list";
import { useState, useRef } from "react";

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

function App() {
  const [todos, setTodo] = useState(mockData);
  const nextId = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: nextId.current++,
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    setTodo([newTodo, ...todos]);
  };

  const onUpdate = (tragetId) => {
    // todo state의 값들 중에
    // tragetId와 일치하는 id를 갖는 todo 아이템의 isDone 변경

    // 인수: todos 배열에서 tragetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 아이템
    setTodo(
      todos.map((todo) => {
        if (todo.id === tragetId) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      })
    );
  };

  // 인수: todos 배열에서 tragetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
  const onDalete = (tragetId) => {
    setTodo(todos.filter((todo) => todo.id !== tragetId));
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
