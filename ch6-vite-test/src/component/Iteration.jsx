import React, { useState, useEffect } from 'react';

const Iteration = () => {
    const [names, setNames] = useState([
        { id: 1, text: '눈사람' },
        { id: 2, text: '얼음' },
        { id: 3, text: '눈' },
        { id: 4, text: '바람' },
    ]);

    const [nextId, setNextId] = useState(() => {
        const maxId = Math.max(...names.map((item) => item.id), 0);
        return maxId + 1;
    });

    const [inputText, setInputText] = useState('');
    const [editId, setEditId] = useState(null);
    const [editText, setEditText] = useState('');
    const [deletedItems, setDeletedItems] = useState([]); // 삭제된 항목 리스트
    const [draggedId, setDraggedId] = useState(null);
    const [draggingItem, setDraggingItem] = useState(null);

    useEffect(() => {
        if (editId === null) {
            setEditText('');
        }
    }, [editId]);

    const onChange = (e) => setInputText(e.target.value);

    const onClick = () => {
        const trimmedText = inputText.trim();

        if (!trimmedText) {
            alert('빈 문자열이나 공백은 추가할 수 없습니다.');
            return;
        }

        if (names.some((name) => name.text.trim().toLowerCase() === trimmedText.toLowerCase())) {
            alert('이미 존재하는 항목입니다.');
            return;
        }

        setNames([...names, { id: nextId, text: trimmedText }]);
        setNextId(nextId + 1);
        setInputText('');
    };

    const onRemove = (id) => {
        const removedItem = names.find((name) => name.id === id);
        setNames(names.filter((name) => name.id !== id));
        setDeletedItems([...deletedItems, removedItem]);
    };

    const onRestore = () => {
        if (deletedItems.length > 0) {
            setNames([...names, ...deletedItems]);
            setDeletedItems([]);
        } else {
            alert('복원할 항목이 없습니다.');
        }
    };

    const onSortAsc = () => {
        const sortedNames = [...names].sort((a, b) => a.text.localeCompare(b.text));
        setNames(sortedNames);
    };

    const onSortDesc = () => {
        const sortedNames = [...names].sort((a, b) => b.text.localeCompare(a.text));
        setNames(sortedNames);
    };

    const handleDragStart = (e, id) => {
        setDraggedId(id);
        setDraggingItem(id);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, targetId) => {
        e.preventDefault();
        const updatedNames = [...names];
        const draggedItem = updatedNames.find((item) => item.id === draggedId);
        const targetIndex = updatedNames.findIndex((item) => item.id === targetId);
        const draggedIndex = updatedNames.findIndex((item) => item.id === draggedId);

        updatedNames.splice(draggedIndex, 1);
        updatedNames.splice(targetIndex, 0, draggedItem);

        setNames(updatedNames);
        setDraggingItem(null);
    };

    const onEdit = (id, text) => {
        setEditId(id);
        setEditText(text);
    };

    const saveEdit = () => {
        if (editText.trim() === '') {
            alert('빈 문자열이나 공백은 허용되지 않습니다.');
            return;
        }

        setNames(
            names.map((name) =>
                name.id === editId ? { ...name, text: editText.trim() } : name
            )
        );
        setEditId(null);
        setEditText('');
    };

    const cancelEdit = () => {
        setEditId(null);
        setEditText('');
    };

    const namesList = names.map((name) => (
        <li
            key={name.id}
            onDoubleClick={() => onRemove(name.id)}
            draggable
            onDragStart={(e) => handleDragStart(e, name.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, name.id)}
            className={draggingItem === name.id ? 'dragging' : ''}
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