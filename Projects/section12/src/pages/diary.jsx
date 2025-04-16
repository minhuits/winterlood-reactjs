import { useParams, useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed-date";
import Header from "../components/header";
import Button from "../components/Button";
import Viewer from "../components/viewer";
import useDiary from "../hooks/useDiary";
import useTitle from "../hooks/useTitle";

const Diary = () => {
  const params = useParams();
  const navigate = useNavigate();

  useTitle(`${params.id}번 일기`);
  const diaryItem = useDiary(params.id);

  if (!diaryItem) {
    return <div>존재하지 않는 일기입니다.</div>;
  }

  const { createDate, emotionId, content } = diaryItem;
  const title = getStringedDate(new Date(createDate));

  return (
    <div>
      <Header
        title={`${title} 일기`}
        leftChild={<Button onClick={() => navigate(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button
            onClick={() => navigate(`/edit/${params.id}`)}
            text={"수정하기"}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
