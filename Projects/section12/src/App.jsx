import { useReducer, useRef, createContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Diary from "./pages/diary";
import Edit from "./pages/edit";
import Home from "./pages/home";
import New from "./pages/new";
import NotFound from "./pages/notfound";

const mockData = [
  {
    id: 1,
    createDate: new Date("2025-04-15").getTime(),
    emotionId: 1,
    content: "1번 일기",
  },
  {
    id: 2,
    createDate: new Date("2025-04-14").getTime(),
    emotionId: 2,
    content: "2번 일기",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [action.data, ...state];
    }
    case "UPDATE": {
      return state.map((item) => {
        return String(item.id) === String(action.data.id)
          ? { ...action.data }
          : item;
      });
    }
    case "REMOVE": {
      return state.filter((item) => {
        return String(item.id) !== String(action.data.id);
      });
    }
    default:
      return state;
  }
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  // 추가
  const onCreate = (createDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createDate,
        emotionId,
        content,
      },
    });
  };
  // 수정
  const onEdit = (id, createDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createDate,
        emotionId,
        content,
      },
    });
  };
  // 삭제
  const onRemove = (id) => {
    dispatch({
      type: "REMOVE",
      id,
    });
  };

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
