import "./emotionItem.css";
import { getEmotionImage } from "/src/util/get-emotion-image.js";

const EmotionItem = ({ emotionId, emotionName, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`emotion-item ${isSelected ? `item_on_${emotionId}` : ""}`}
    >
      <img
        className="emotion-img"
        src={getEmotionImage(emotionId)}
        alt={emotionName}
      />
      <div className="emotion-name">{emotionName}</div>
    </div>
  );
};

export default EmotionItem;
