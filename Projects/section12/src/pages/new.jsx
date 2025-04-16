import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import Button from "../components/Button";
import Editor from "../components/editor";
import Header from "../components/header";
import useTitle from "../hooks/useTitle";

const New = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  const nextPage = useNavigate();
  
  useTitle("새 일기 쓰기");

  const onSubmit = (input) => {
    onCreate(input.createDate.getTime(), input.emotionId, input.content);
    nextPage("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nextPage(-1)} text={"< 뒤로 가기"} />}
      />
      <Editor onSubmit={onSubmit} />
    </div>
  );
};

export default New;
