import { useState, useContext, use } from "react";
import { DiaryStateContext } from "../App";
import Header from "../components/header";
import Button from "../components/button";
import DiaryList from "../components/diaryList";

const getMonthlyDate = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();

  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createDate && item.createDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  const [pivotDate, setPivotedDate] = useState(new Date());

  const monthlyDate = getMonthlyDate(pivotDate, data);

  const onIncreaseMonth = () => {
    setPivotedDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotedDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };

  return (
    <div>
      <div>
        <Header
          title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
          leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
          rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
        />
      </div>
      <DiaryList data={monthlyDate} />
    </div>
  );
};

export default Home;
