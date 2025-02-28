import React, { useState } from 'react';
import Average from './Components/Average'; // 파일 경로 확인

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div>
        <h1 className='react'>ch8 Hooks</h1>
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? '숨기기' : '보이기'}
        </button>
        <hr />
      </div>
      {visible && <h2>useReducer 버전 Counter</h2>}
      <Average />
    </>
  );
};

export default App;
