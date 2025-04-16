import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryStateContext } from "../App";

const useDiary = (id) => {
  const nextPage = useNavigate();
  const data = useContext(DiaryStateContext);
  const [diaryItem, setDiaryItem] = useState();

  useEffect(() => {
    const item = data.find((item) => String(item.id) === String(id));

    if (!item) {
      window.alert("존재하지 않는 일기입니다!");
      nextPage("/", { replace: true });
    }

    setDiaryItem(item);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return diaryItem;
};

export default useDiary;
