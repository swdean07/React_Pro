import React, { useState } from "react";

const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const { username, password } = form;

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onLogin = () => {
        if (!username || !password) {
            alert('모든 값을 입력해주세요');
            return;
        }
        console.log(`Username: ${username}, Password: ${password}`);
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
        </div>
    );
};

export default Login;