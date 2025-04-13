import "./list.css";
import TodoItem from "./todoItem";
import { useState, useMemo } from "react";

const List = ({ todos, onUpdate, onDalete }) => {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const getFilteredTodos = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) => {
      return todo.content.toLowerCase().includes(search.toLowerCase());
    });
  };

  const filteredTodos = getFilteredTodos();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);
  // 의존성배열: deps

  return (
    <div className="list">
      <h4>Todo List 🌱</h4>
      <div>
        <div>total: {totalCount}</div>
        <div>done: {doneCount}</div>
        <div>not done: {notDoneCount}</div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="검색어를 입력하세요"
      />
      <div className="wrapper">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            onUpdate={onUpdate}
            onDalete={onDalete}
          />
        ))}
      </div>
    </div>
  );
};
export default List;
