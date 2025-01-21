import React, { useState } from 'react';

const Say = () => {
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('black');

    const onClickEnter = () => setMessage('안녕하세요!');
    const onClickLeave = () => setMessage('안녕히 가세요!');
    const onClickEnter2 = () => setMessage('환영합니다!');

    return (
        <div>
            <button onClick={onClickEnter}>입장</button>
            <button onClick={onClickLeave}>퇴장</button>
            <button onClick={onClickEnter2}>환영합니다!</button>
            <h1 style={{ color }}>{message}</h1>
            <button style={{ color: 'red' }} onClick={() => setColor('red')}>
                빨간색
            </button>
            <button style={{ color: 'green' }} onClick={() => setColor('green')}>
                초록색
            </button>
            <button style={{ color: 'blue' }} onClick={() => setColor('blue')}>
                파란색
            </button>
            <button style={{ color: 'black' }} onClick={() => setColor('black')}>
                초기화
            </button>
        </div>
    );
};

export default Say;