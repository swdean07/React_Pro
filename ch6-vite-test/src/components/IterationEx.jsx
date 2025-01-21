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

    // 항목 추가
    const onClick = () => {
        if (inputText.trim() === '') {
            alert('공백은 추가할 수 없습니다.'); // 공백 입력 방지
            return;
        }

        const isDuplicate = names.some((name) => name.text === inputText);
        if (isDuplicate) {
            alert('중복된 항목은 추가할 수 없습니다.');
            return;
        }

        const nextNames = names.concat({
            id: nextId,
            text: inputText,
        });
        setNextId(nextId + 1);
        setNames(nextNames);
        setInputText('');
    };

    // 항목 삭제
    const onRemove = (id) => {
        const removedItem = names.find((name) => name.id === id);

        // 삭제 확인 메시지 표시
        const isConfirmed = window.confirm(`정말 '${removedItem.text}' 항목을 삭제하시겠습니까?`);
        if (!isConfirmed) {
            return; // 취소 시 아무 작업도 하지 않음
        }

        const nextNames = names.filter((name) => name.id !== id);
        setLastDeleted(removedItem); // 삭제된 항목 저장
        setNames(nextNames);
    };

    // 항목의 ID 값 확인
    const onAlertId = (id) => {
        alert(`항목의 ID는 ${id}입니다.`);
    };

    // 항목 수정
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

    // 항목 정렬
    const sortNames = (order) => {
        const sortedNames = [...names].sort((a, b) => {
            if (order === 'asc') return a.text.localeCompare(b.text);
            if (order === 'desc') return b.text.localeCompare(a.text);
            return 0;
        });
        setNames(sortedNames);
    };

    // 최근 삭제된 항목 복원
    const restoreLastDeleted = () => {
        if (lastDeleted) {
            setNames([...names, lastDeleted]); // 삭제된 항목 복원
            setLastDeleted(null); // 복원 후 초기화
        } else {
            alert('복원할 항목이 없습니다.');
        }
    };

    // 리스트 렌더링
    const namesList = names.map((name) => (
        <li
            key={name.id}
            onClick={() => onRemove(name.id)} // 텍스트 클릭 시 삭제
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
            {lastDeleted && (
                <p>최근 삭제된 항목: {lastDeleted.text}</p>
            )}
        </>
    );
};

export default IterationEx;


