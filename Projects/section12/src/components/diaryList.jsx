import "./diaryList.css";
import Button from "./button";
import DiaryItem from "./diaryItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({ data }) => {
  const nextPage = useNavigate();
  const [sortType, setSortType] = useState("latest");

  const onChangeSortType = (event) => {
    setSortType(event.target.value);
  };

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === "oldest") {
        return Number(b.createDate) - Number(a.createDate);
      } else {
        return Number(a.createDate) - Number(b.createDate);
      }
    });
  };

  const sortDate = getSortedDate();

  return (
    <div className="diary-list">
      <div className="menu-bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>과거순</option>
        </select>
        <Button
          onClick={() => nextPage("/new")}
          text={"새 일기 쓰기"}
          type={"primary"}
        />
      </div>
      <div className="list-wrapper">
        {sortDate.map((item) => (
          <DiaryItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default DiaryList;
