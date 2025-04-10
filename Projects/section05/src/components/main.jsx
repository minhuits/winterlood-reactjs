/**
 * JSX 주의 사항
 * 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다.
 * 2. 숫자, 문자열, 배열 값만 랜더링 된다.
 * 3. 모든 태그는 닫혀있어야 한다.
 * 4. 최상위 태그는 반드시 하나여야 한다.
 */

import "./Main.css";

const Main = () => {
  const user = {
    name: "홍길동",
    isLogin: false,
    age: 20,
  };

  if (user.isLogin) {
    return <div calsseName="logout">로그아웃</div>;
  } else {
    return (
      <main>
        <h1>로그인</h1>
        <h2>{user.age}</h2>
      </main>
    );
  }

  // return (
  //   <main>
  //     <h1>Main</h1>
  //     <h2>{num}</h2>
  //   </main>
  // );
};

export default Main;
