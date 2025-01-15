import React, { useState } from "react";

const EventPractice = () => {
    const [form, setForm] = useState({
        username: '',
        message: '',
    });

    const [output, setOutput] = useState('');

    const { username, message } = form;

    const onChange = (e) => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextForm);
    };

    const onClick = () => {
        if (!username || !message) {
            alert('모든 값을 입력해주세요');
            return;
        }
        setOutput(`${username}: ${message}`);
        setForm({
            username: '',
            message: '',
        });
    };

    const onReset = () => {
        setForm({
            username: '',
            message: '',
        });
        setOutput('');
    };

    const onKeyPress = (e) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };

    return (
        <div>
            <h1>이벤트 연습</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChange}
            />
            <input
                type="text"
                name="message"
                placeholder="아무거나 입력해 보세요"
                value={message}
                onChange={onChange}
                onKeyPress={onKeyPress}
            />
            <button onClick={onClick}>확인</button>
            <button onClick={onReset}>초기화</button>
            <h2>{output}</h2>
        </div>
    );
};

export default EventPractice;
