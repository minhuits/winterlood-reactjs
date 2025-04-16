import "./viewer.css";
import { getEmotionImage } from "../util/get-emotion-image.js";
import { emotionList } from "../util/constants.js";

const Viewer = ({ emotionId, content }) => {
  const imagItem = emotionList.find(
    (item) => String(item.emotionId) === String(emotionId)
  );

  return (
    <div className="viewer">
      <section className="img_section">
        <h4>오늘의 감정</h4>
        <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
          <img src={getEmotionImage(emotionId)} alt={`emotion${emotionId}`} />
          <div>{imagItem.emotionName}</div>
        </div>
      </section>
      <section className="content_section">
        <h4>오늘의 일기</h4>
        <div className="content_wrapper">
          <p>{content}</p>
        </div>
      </section>
    </div>
  );
};

export default Viewer;
