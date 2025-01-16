import React, { useState } from 'react';

const IterationSample = () => {
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' },
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(5); // 새로운 항목을 추가할 때 사용할 ID
    const [editId, setEditId] = useState(null); // 수정 중인 항목의 ID
    const [editText, setEditText] = useState(''); // 수정할 항목의 텍스트
    const [deletedItem, setDeletedItem] = useState(null); // 최근 삭제된 항목 저장
    const [draggedId, setDraggedId] = useState(null); // 드래그된 항목의 ID
    const [draggingItem, setDraggingItem] = useState(null); // 드래그 중인 항목

    const onChange = (e) => setInputText(e.target.value);

    const onClick = () => {
        const trimmedText = inputText.trim();

        // 문제 1: 중복 항목 추가 방지
        if (!trimmedText) {
            alert('빈 문자열이나 공백은 추가할 수 없습니다.');
            return;
        }

        if (names.some((name) => name.text.trim().toLowerCase() === trimmedText.toLowerCase())) {
            alert('이미 존재하는 항목입니다.');
            return;
        }

        const nextNames = names.concat({
            id: nextId,
            text: trimmedText,
        });
        setNextId(nextId + 1); // nextId 값을 1 증가
        setNames(nextNames); // names 값을 업데이트
        setInputText(''); // inputText를 비운다
    };

    const onRemove = (id) => {
        const removedItem = names.find((name) => name.id === id);
        const nextNames = names.filter((name) => name.id !== id);
        setNames(nextNames);
        setDeletedItem(removedItem); // 삭제된 항목 저장
    };

    const onClickItem = (id) => {
        alert(`항목의 ID는 ${id}입니다.`);
    };

    const onRightClickItem = (e, id, currentText) => {
        e.preventDefault();
        setEditId(id);
        setEditText(currentText);
    };

    const onEditChange = (e) => setEditText(e.target.value);

    const onEditSubmit = () => {
        if (!editText.trim()) {
            alert('빈 문자열이나 공백은 추가할 수 없습니다.');
            return;
        }

        const nextNames = names.map((name) =>
            name.id === editId ? { ...name, text: editText.trim() } : name
        );
        setNames(nextNames);
        setEditId(null);
        setEditText('');
    };

    const onCancelEdit = () => {
        setEditId(null);
        setEditText('');
    };

    const onSortAsc = () => {
        const sortedNames = [...names].sort((a, b) => a.text.localeCompare(b.text));
        setNames(sortedNames);
    };

    const onSortDesc = () => {
        const sortedNames = [...names].sort((a, b) => b.text.localeCompare(a.text));
        setNames(sortedNames);
    };

    const onRestore = () => {
        if (deletedItem) {
            setNames([deletedItem, ...names]); // 삭제된 항목을 리스트의 맨 앞에 복원
            setDeletedItem(null); // 복원 후 삭제된 항목 초기화
        } else {
            alert('복원할 항목이 없습니다.');
        }
    };

    const handleDragStart = (e, id) => {
        setDraggedId(id); // 드래그 시작 시 ID 저장
        setDraggingItem(id); // 드래그 중인 항목 ID 저장
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // 드래그한 항목이 다른 항목 위에 있을 때 기본 동작을 방지
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        const updatedNames = [...names];
        const draggedItem = updatedNames.find((item) => item.id === draggedId);
        const targetIndex = updatedNames.findIndex((item) => item.id === targetId);
        const draggedIndex = updatedNames.findIndex((item) => item.id === draggedId);

        // 항목의 위치를 교환
        updatedNames.splice(draggedIndex, 1);
        updatedNames.splice(targetIndex, 0, draggedItem);

        setNames(updatedNames);
        setDraggingItem(null); // 드래그 종료
    };

    const namesList = names.map((name) => (
        <li
            key={name.id}
            onClick={() => onClickItem(name.id)} // 클릭하여 항목 ID 표시
            onDoubleClick={() => onRemove(name.id)} // 더블클릭하여 항목 삭제
            onContextMenu={(e) => onRightClickItem(e, name.id, name.text)} // 우클릭하여 항목 수정
            draggable
            onDragStart={(e) => handleDragStart(e, name.id)} // 드래그 시작 이벤트
            onDragOver={handleDragOver} // 드래그한 항목이 다른 항목 위에 있을 때 발생하는 이벤트
            onDrop={(e) => handleDrop(e, name.id)} // 항목을 놓을 때
            className={draggingItem === name.id ? 'dragging' : ''} // 드래그 중인 항목에 클래스를 추가하여 스타일링
        >
            {name.text}
        </li>
    ));

    return (
        <>
            <input
                value={inputText}
                onChange={onChange}
                placeholder="항목을 입력하세요"
            />
            <button onClick={onClick}>추가</button>
            <button onClick={onSortAsc}>오름차순 정렬 (A-Z)</button>
            <button onClick={onSortDesc}>내림차순 정렬 (Z-A)</button>
            <button onClick={onRestore}>삭제 취소</button>
            <ul>{namesList}</ul>

            {/* 수정 입력창 */}
            {editId !== null && (
                <div>
                    <input
                        value={editText}
                        onChange={onEditChange}
                        placeholder="수정할 항목을 입력하세요"
                    />
                    <button onClick={onEditSubmit}>수정</button>
                    <button onClick={onCancelEdit}>취소</button>
                </div>
            )}

            {/* 삭제된 항목 표시 및 복원 안내 */}
            {deletedItem && (
                <div>
                    <p>삭제된 항목: {deletedItem.text}</p>
                    <button onClick={onRestore}>삭제 복원</button>
                </div>
            )}
        </>
    );
};

export default IterationSample;