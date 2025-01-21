import { useState, useEffect } from 'react';

const Info = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        console.log('렌더링이 완료되었습니다!');
        console.log({
            name,
            nickname,
        });
        return () => {
            console.log('cleanup');
            console.log(name);
        };
        // }, [name, nickname]); // name과 nickname이 변경될 때마다 useEffect 실행
    }, [name]); // name과 nickname이 변경될 때마다 useEffect 실행

    const onChangeName = (e) => {
        setName(e.target.value);
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    return (
        <div>
            <div>
                <input value={name} onChange={onChangeName} placeholder="이름" />
                <input value={nickname} onChange={onChangeNickname} placeholder="닉네임" />
            </div>
            <div>
                <div>
                    <b>이름:</b> {name}
                </div>
                <div>
                    <b>닉네임:</b> {nickname}
                </div>
            </div>
        </div>
    );
};

export default Info;