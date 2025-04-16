import "./diaryItem.css";
import { getEmotionImage } from "/src/util/get-emotion-image.js";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const DiaryItem = ({ id, createDate, emotionId, content }) => {
  const nextPage = useNavigate();

  return (
    <div className="diary-item">
      <div
        onClick={() => nextPage(`/diary/${id}`)}
        className={`diary-img img_id${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} />
      </div>
      <div onClick={() => nextPage(`/diary/${id}`)} className="diary-info">
        <div className="created-date">
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="diary-button">
        <Button 
        onClick={() => nextPage(`/edit/${id}`)}
        text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
