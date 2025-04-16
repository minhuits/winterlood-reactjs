import {
  createContext,
  useEffect,
  useReducer,
  useRef,
  useState
} from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Diary from "./pages/diary";
import Edit from "./pages/edit";
import Home from "./pages/home";
import New from "./pages/new";
import NotFound from "./pages/notfound";

// const mockData = [
//   {
//     id: 1,
//     createDate: new Date("2025-04-15").getTime(),
//     emotionId: 1,
//     content: "1번 일기",
//   },
//   {
//     id: 2,
//     createDate: new Date("2025-04-14").getTime(),
//     emotionId: 2,
//     content: "2번 일기",
//   },
// ];

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? { ...action.data } : item
      );
      break;
    }
    case "REMOVE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(3);

  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);

    if (Array.isArray(parsedData)) {
      setLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });

    dispatch({
      type: "INIT",
      data: parsedData,
    });

    setLoading(false);
  }, []);

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

  if (isLoading) {
    return <div>로딩중...</div>;
  }

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
