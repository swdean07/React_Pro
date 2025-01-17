import React, { useState } from 'react';
import Info from './component/Info';
import CounterUsereducer from './component/CounterUsereducer';
import InfoUserReducer from './component/InfoUserReducer';

const App = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div>
        <h1 className='react'>ch8 hooks 함수형 컴포넌트 추가 기능 확인</h1>
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          {visible ? '숨기기' : '보이기'}
        </button>
        <hr />
        {visible && <Info />}
      </div>
      <h2>useReducer 버전 Counter</h2>
      <CounterUsereducer />
      <InfoUserReducer />
    </>
  );
};

export default App;