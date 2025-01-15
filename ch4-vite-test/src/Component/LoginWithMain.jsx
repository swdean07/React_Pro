import React, { useState } from "react";

const LoginWithMain = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const [message, setMessage] = useState('');
    const { username, password } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onLogin = () => {
        // 모든 필드가 채워졌는지 확인
        if (!username || !password) {
            alert('모든 값을 입력해주세요.');
            return;
        }

        // 메인 화면으로 이동 메시지 출력
        setMessage('메인 화면으로 이동합니다!');
    };

    return (
        <div>
            <h1>로그인</h1>
            <input
                type="text"
                name="username"
                placeholder="사용자명"
                value={username}
                onChange={onChange}
            />
            <input
                type="password"
                name="password"
                placeholder="비밀번호"
                value={password}
                onChange={onChange}
            />
            <button onClick={onLogin}>로그인</button>
            {message && <h2>{message}</h2>}
        </div>
    );
};

export default LoginWithMain;
