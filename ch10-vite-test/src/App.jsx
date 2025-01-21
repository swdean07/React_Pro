import { useRef, useCallback, useState } from 'react';

import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function App() {
  // 초기 상태
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true
    },
    {
      id: 3,
      text: '일정 관리 앱 만들어 보기',
      checked: false
    },
  ]);

  // nextId 관리
  const nextId = useRef(4);

  // 할 일 추가
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => [...todos, todo]);
    nextId.current += 1; // 다음 ID 증가
  }, []);

  // 할 일 삭제
  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  // 할 일 토글 (checked 상태 반전)
  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  // 모든 항목 토글
  const onToggleAll = useCallback(() => {
    setTodos((todos) => todos.map((todo) => ({ ...todo, checked: !todo.checked })));
  }, []);

  // 필터링된 목록
  const checkedTodos = todos.filter((todo) => todo.checked);
  const uncheckedTodos = todos.filter((todo) => !todo.checked);

  // 체크된 항목 개수
  const checkedCount = checkedTodos.length;

  return (
    <>
      <h1 className="react">ch10 일정관리 애플리케이션</h1>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <div className="centered-button">
          <button onClick={onToggleAll}>모든 항목 토글</button>
        </div>
        <p>체크된 항목 개수: {checkedCount}</p>
        <div className="todo-list-section">
          <div className="todo-list-section">
            <h2>체크된 항목</h2>
            <TodoList todos={checkedTodos} onRemove={onRemove} onToggle={onToggle} />
          </div>
          <h2>체크되지 않은 항목</h2>
          <TodoList todos={uncheckedTodos} onRemove={onRemove} onToggle={onToggle} />
        </div>

      </TodoTemplate>
    </>
  );
}

export default App;
