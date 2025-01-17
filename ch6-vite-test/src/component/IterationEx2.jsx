import React, { useState } from 'react';

const IterationEx2 = () => {
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' },
    ]); // 초기 항목 목록
    const [inputText, setInputText] = useState(''); // 입력값 상태
    const [nextId, setNextId] = useState(5); // 새로운 항목의 고유 ID 생성
    const [lastDeleted, setLastDeleted] = useState(null); // 최근 삭제된 항목 저장

    // 항목 추가 처리 함수
    const onClick = () => {
        if (inputText.trim() === '') {
            // 공백 입력 방지
            alert('공백은 추가할 수 없습니다.');
            return;
        }

        const isDuplicate = names.some((name) => name.text === inputText);
        if (isDuplicate) {
            // 중복 항목 추가 방지
            alert('중복된 항목은 추가할 수 없습니다.');
            return;
        }

        // 새로운 항목 추가
        const nextNames = names.concat({
            id: nextId,
            text: inputText,
        });
        setNextId(nextId + 1); // 다음 ID 증가
        setNames(nextNames); // 상태 업데이트
        setInputText(''); // 입력창 초기화
    };

    // 항목 삭제 처리 함수
    const onRemove = (id) => {
        const removedItem = names.find((name) => name.id === id); // 삭제 대상 찾기
        const nextNames = names.filter((name) => name.id !== id); // 삭제된 항목 제외
        setLastDeleted(removedItem); // 최근 삭제된 항목 저장
        console.log('삭제된 항목:', removedItem); // 디버깅용 로그 출력
        setNames(nextNames); // 상태 업데이트
    };

    // 항목 ID 확인 함수
    const onAlertId = (id) => {
        alert(`항목의 ID는 ${id}입니다.`);
    };

    // 항목 수정 처리 함수
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

    // 항목 정렬 함수
    const sortNames = (order) => {
        const sortedNames = [...names].sort((a, b) => {
            if (order === 'asc') return a.text.localeCompare(b.text); // 오름차순
            if (order === 'desc') return b.text.localeCompare(a.text); // 내림차순
            return 0;
        });
        setNames(sortedNames);
    };

    // 삭제 취소 처리 함수
    const restoreLastDeleted = () => {
        if (lastDeleted) {
            // 삭제된 항목 복원
            setNames((prevNames) => [...prevNames, lastDeleted]);
            console.log('복원된 항목:', lastDeleted); // 디버깅용 로그 출력
            setLastDeleted(null); // 상태 초기화
        }
    };

    // 목록 렌더링
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
            {/* 최근 삭제된 항목 표시 */}
            {lastDeleted && (
                <div>
                    최근 삭제된 항목: <strong>{lastDeleted.text}</strong>
                </div>
            )}
        </>
    );
};

export default IterationEx2;


