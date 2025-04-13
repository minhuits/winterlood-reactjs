import "./todoItem.css";
import { memo } from "react";

const TodoItem = ({ id, isDone, content, date, onUpdate, onDalete }) => {
  const onChangeCheckBox = () => {
    onUpdate(id);
  };

  const onDelete = () => {
    onDalete(id);
  };

  return (
    <div className="todo-item">
      <input
        onChange={onChangeCheckBox}
        readOnly
        checked={isDone}
        type="checkbox"
      />
      <div className="content">{content}</div>
      <div className="date">{new Date(date).toLocaleDateString()}</div>
      <button onClick={onDelete}>삭제</button>
    </div>
  );
};

// 고차 컴포넌트 (HOC)
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라, Props가 바뀌었는지 안바뀌었는지 판단
//   // T => Props 바뀌지 않음 => 리렌더링 X
//   // F => Props 바뀜 => 리렌더링 O
//   if (prevProps.id !== nextProps.id) return false;
//   if (prevProps.isDone !== nextProps.isDone) return false;
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;
//
//   return true;
// });

export default memo(TodoItem);