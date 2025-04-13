import "./todoItem.css";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDalete }) => {
  const onChange = () => {
    onUpdate(id);
  };

  const onDelete = () => {
    onDalete(id);
  };

  return (
    <div className="todo-item">
      <input onChange={onChange} readOnly checked={isDone} type="checkbox" />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

export default TodoItem;
