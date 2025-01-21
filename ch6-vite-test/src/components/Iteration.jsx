import React, { useState, useEffect } from 'react';

const Iteration = () => {
    // 초기 항목 리스트
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' },
    ]);

    // 다음에 추가될 항목의 ID 설정 (현재 리스트의 최대 ID + 1)
    const [nextId, setNextId] = useState(() => {
        const maxId = Math.max(...names.map((item) => item.id), 0);
        return maxId + 1;
    });

    const [inputText, setInputText] = useState(''); // 입력창의 텍스트 상태
    const [editId, setEditId] = useState(null); // 수정 중인 항목의 ID
    const [editText, setEditText] = useState(''); // 수정 중인 텍스트
    const [deletedItems, setDeletedItems] = useState([]); // 삭제된 항목의 리스트
    const [draggedId, setDraggedId] = useState(null); // 드래그 중인 항목의 ID
    const [draggingItem, setDraggingItem] = useState(null); // 드래그 중인 항목 표시 상태

    // 수정 취소 시 입력 상태를 초기화
    useEffect(() => {
        if (editId === null) {
            setEditText('');
        }
    }, [editId]);

    // 입력창 변경 처리
    const onChange = (e) => setInputText(e.target.value);

    // 항목 추가 처리
    const onClick = () => {
        const trimmedText = inputText.trim(); // 공백 제거

        if (!trimmedText) {
            // 공백이나 빈 문자열 입력 방지
            alert('빈 문자열이나 공백은 추가할 수 없습니다.');
            return;
        }

        if (
            names.some(
                (name) => name.text.trim().toLowerCase() === trimmedText.toLowerCase()
            )
        ) {
            // 중복된 텍스트 입력 방지
            alert('이미 존재하는 항목입니다.');
            return;
        }

        // 새로운 항목 추가
        setNames([...names, { id: nextId, text: trimmedText }]);
        setNextId(nextId + 1); // 다음 ID 증가
        setInputText(''); // 입력창 초기화
    };

    // 항목 삭제 처리
    const onRemove = (id) => {
        const removedItem = names.find((name) => name.id === id); // 삭제할 항목 찾기
        setNames(names.filter((name) => name.id !== id)); // 해당 항목 제거
        setDeletedItems([...deletedItems, removedItem]); // 삭제된 항목 저장
    };

    // 삭제된 항목 복원
    const onRestore = () => {
        if (deletedItems.length > 0) {
            setNames([...names, ...deletedItems]); // 삭제된 항목 전체 복원
            setDeletedItems([]); // 삭제된 항목 리스트 초기화
        } else {
            alert('복원할 항목이 없습니다.');
        }
    };

    // 오름차순 정렬
    const onSortAsc = () => {
        const sortedNames = [...names].sort((a, b) => a.text.localeCompare(b.text));
        setNames(sortedNames);
    };

    // 내림차순 정렬
    const onSortDesc = () => {
        const sortedNames = [...names].sort((a, b) => b.text.localeCompare(a.text));
        setNames(sortedNames);
    };

    // 드래그 시작
    const handleDragStart = (e, id) => {
        setDraggedId(id); // 드래그 중인 항목의 ID 저장
        setDraggingItem(id); // 드래그 중인 항목 시각적 표시
    };

    // 드래그 중 (드롭 가능한 상태 유지)
    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // 드래그 항목 드롭
    const handleDrop = (e, targetId) => {
        e.preventDefault();
        const updatedNames = [...names];
        const draggedItem = updatedNames.find((item) => item.id === draggedId); // 드래그 중인 항목
        const targetIndex = updatedNames.findIndex((item) => item.id === targetId); // 드롭 대상의 인덱스
        const draggedIndex = updatedNames.findIndex((item) => item.id === draggedId); // 드래그 항목의 인덱스

        updatedNames.splice(draggedIndex, 1); // 드래그 항목 제거
        updatedNames.splice(targetIndex, 0, draggedItem); // 드롭 위치에 삽입

        setNames(updatedNames);
        setDraggingItem(null); // 드래그 표시 제거
    };

    // 항목 수정 시작
    const onEdit = (id, text) => {
        setEditId(id); // 수정 중인 항목의 ID 저장
        setEditText(text); // 수정 중인 텍스트 설정
    };

    // 수정 저장
    const saveEdit = () => {
        if (editText.trim() === '') {
            // 공백 방지
            alert('빈 문자열이나 공백은 허용되지 않습니다.');
            return;
        }

        // 수정된 항목 적용
        setNames(
            names.map((name) =>
                name.id === editId ? { ...name, text: editText.trim() } : name
            )
        );
        setEditId(null); // 수정 종료
        setEditText(''); // 텍스트 초기화
    };

    // 수정 취소
    const cancelEdit = () => {
        setEditId(null); // 수정 종료
        setEditText(''); // 텍스트 초기화
    };

    // 항목 리스트 렌더링
    const namesList = names.map((name) => (
        <li
            key={name.id}
            onDoubleClick={() => onRemove(name.id)} // 더블 클릭 시 삭제
            draggable
            onDragStart={(e) => handleDragStart(e, name.id)} // 드래그 시작
            onDragOver={handleDragOver} // 드래그 중
            onDrop={(e) => handleDrop(e, name.id)} // 드롭
            className={draggingItem === name.id ? 'dragging' : ''} // 드래그 시 시각적 표시
            style={{
                border: draggingItem === name.id ? '2px dashed #4CAF50' : '1px solid #ddd',
                padding: '8px',
                margin: '4px 0',
                backgroundColor: draggingItem === name.id ? '#e7f9e7' : '#fff',
            }}
        >
            <span>{name.text}</span>
            <button onClick={() => onEdit(name.id, name.text)}>수정</button>
        </li>
    ));

    return (
        <div>
            <input
                value={inputText}
                onChange={onChange}
                placeholder="항목을 입력하세요"
            />
            <button onClick={onClick}>추가</button>
            <button onClick={onSortAsc}>오름차순 정렬 (A-Z)</button>
            <button onClick={onSortDesc}>내림차순 정렬 (Z-A)</button>
            <button onClick={onRestore}>삭제 복원</button>
            <ul>{namesList}</ul>
            {deletedItems.length > 0 && (
                <p>
                    최근 삭제된 항목: {deletedItems.map((item) => item.text).join(', ')}
                </p>
            )}
            {editId !== null && (
                <div>
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="수정할 텍스트 입력"
                    />
                    <button onClick={saveEdit}>저장</button>
                    <button onClick={cancelEdit}>취소</button>
                </div>
            )}
        </div>
    );
};

export default Iteration;
