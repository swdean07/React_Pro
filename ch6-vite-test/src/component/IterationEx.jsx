import React, { useState } from 'react';

const IterationEx = () => {
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' },
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 ID
    const [lastDeleted, setLastDeleted] = useState(null); // 최근 삭제된 항목

    // 문제 1: 중복 항목 추가 방지
    const onClick = () => {
        if (inputText.trim() === '') {
            alert('공백은 추가할 수 없습니다.'); // 문제 2: 공백 입력 방지
            return;
        }

        const isDuplicate = names.some((name) => name.text === inputText);
        if (isDuplicate) {
            alert('중복된 항목은 추가할 수 없습니다.');
            return;
        }

        const nextNames = names.concat({
            id: nextId, // nextId 값을 id로 설정
            text: inputText,
        });
        setNextId(nextId + 1); // nextId 값을 1 증가
        setNames(nextNames); // names 값을 업데이트
        setInputText(''); // inputText를 비운다
    };

    const onRemove = (id) => {
        const removedItem = names.find((name) => name.id === id);
        const nextNames = names.filter((name) => name.id !== id);
        setLastDeleted(removedItem); // 삭제된 항목 저장
        setNames(nextNames);
    };

    // 문제 3: 항목의 ID 값을 클릭하여 확인
    const onAlertId = (id) => {
        alert(`항목의 ID는 ${id}입니다.`);
    };

    // 응용 문제 1: 항목 수정 기능
    const onEdit = (id) => {
        const newName = prompt('새로운 항목명을 입력하세요:');
        if (newName && newName.trim() !== '') {
            setNames(
                names.map((name) =>
                    name.id === id ? { ...name, text: newName } : name
                )
            );
        }
    };

    // 응용 문제 2: 항목 정렬 기능
    const sortNames = (order) => {
        const sortedNames = [...names].sort((a, b) => {
            if (order === 'asc') return a.text.localeCompare(b.text);
            if (order === 'desc') return b.text.localeCompare(a.text);
            return 0;
        });
        setNames(sortedNames);
    };

    // 응용 문제 3: 삭제 취소 기능
    const restoreLastDeleted = () => {
        if (lastDeleted) {
            setNames([...names, lastDeleted]);
            setLastDeleted(null); // 복원 후 초기화
        }
    };

    const namesList = names.map((name) => (
        <li
            key={name.id}
            onDoubleClick={() => onRemove(name.id)} // 삭제
            onClick={() => onAlertId(name.id)} // ID 확인
            onContextMenu={(e) => {
                e.preventDefault(); // 우클릭 기본 동작 방지
                onEdit(name.id); // 수정
            }}
        >
            {name.text}
        </li>
    ));

    return (
        <>
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="항목을 입력하세요"
            />
            <button onClick={onClick}>추가</button>
            <button onClick={() => sortNames('asc')}>오름차순 정렬</button>
            <button onClick={() => sortNames('desc')}>내림차순 정렬</button>
            <button onClick={restoreLastDeleted} disabled={!lastDeleted}>
                삭제 취소
            </button>
            <ul>{namesList}</ul>
        </>
    );
};

export default IterationEx;
