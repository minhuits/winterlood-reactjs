import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import EmotionItem from "./emotionItem";
import "./editor.css";
import { emotionList } from "../util/constants.js";
import { getStringedDate } from "../util/get-stringed-date.js";

const Editor = ({ initData, onSubmit }) => {
  const nextPage = useNavigate();
  const [input, setInput] = useState({
    createDate: new Date(),
    content: "",
    emotionId: 3,
  });

  useEffect(() => {
    if (initData) {
      setInput({
        ...initData,
        createDate: new Date(Number(initData.createDate)),
      });
    }
  }, [initData]);

  const onClickSubmit = () => {
    onSubmit(input);
  };

  const onChangeInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "createDate") {
      value = new Date(value);
    }

    setInput({
      ...input,
      [name]: value,
    });
  };

  return (
    <div className="editor">
      <section className="date">
        <h4>오늘의 날짜</h4>
        <input
          name="createDate"
          onChange={onChangeInput}
          value={getStringedDate(input.createDate)}
          type="date"
        />
      </section>
      <section className="emotion">
        <h4>오늘의 감정</h4>
        <div className="emotion-list">
          {emotionList.map((item) => (
            <EmotionItem
              onClick={() =>
                onChangeInput({
                  target: {
                    name: "emotionId",
                    value: item.emotionId,
                  },
                })
              }
              key={item.emotionId}
              {...item}
              isSelected={item.emotionId === input.emotionId}
            />
          ))}
        </div>
      </section>
      <section className="content">
        <h4>오늘의 일기</h4>
        <textarea
          name="content"
          value={input.content}
          onChange={onChangeInput}
          placeholder="오늘은 어땠나요?"
        />
      </section>
      <section className="button-section">
        <Button onClick={() => nextPage(-1)} text={"취소하기"} />
        <Button onClick={onClickSubmit} text={"작성완료"} type={"primary"} />
      </section>
    </div>
  );
};

export default Editor;
