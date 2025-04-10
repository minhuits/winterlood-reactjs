import useInput from "../hooks/useInput.jsx";

/**
 * 3가지 hook 관련 팁
 * 1. 함수 컴포넌트, 커스텀 훅 내북에서만 호출 가능
 * 2. 조건문, 반복문에서는 호출할 수 없다.
 * 3. 나만의 훅(Custom Hook)을 만들 수 있다.
 *    => 함수명에 접두사 'use' 사용하면 된다.
 */
const HookExam = () => {
  const [input, onChange] = useInput();

  return (
    <div>
      <input value={input} onChange={onChange} />
    </div>
  );
};

export default HookExam;
