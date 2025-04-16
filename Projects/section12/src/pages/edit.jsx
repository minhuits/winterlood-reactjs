import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import Header from "../components/header";
import Button from "../components/Button";
import Editor from "../components/editor";
import useDiary from "../hooks/useDiary";
import useTitle from "../hooks/useTitle";

const Edit = () => {
  const params = useParams();
  const nextPage = useNavigate();
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  const diaryItem = useDiary(params.id);

  useTitle(`${params.id}번 일기 수정하기`);

  const onClickDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      onRemove(params.id);
      nextPage("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("정말 수정할까요?")) {
      onEdit(
        params.id,
        input.createDate.getTime(),
        input.emotionId,
        input.content
      );
      nextPage("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nextPage(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"negative"} />
        }
      />
      <Editor initData={diaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
