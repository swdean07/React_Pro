import { useRef, useCallback, useState, useReducer } from 'react';
import './App.css';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// 더미 데이터 추가
// 많은 더미 데이터 추가하기.
function createBulkTodos() {
  const array = [];
  for (let i = 1; i <= 5000; i++) {
    array.push({
      id: i,
      text: `할 일 ${i}`,
      checked: false,
    });
  }
  return array;
}

// 리듀서 함수
// todoReducer 함수
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새 항목 추가
      return todos.concat(action.todo);
    case 'REMOVE': // 항목 제거
      return todos.filter((todo) => todo.id !== action.id);
    case 'TOGGLE': // 체크 상태 토글
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    case 'REMOVE_CHECKED': // 체크된 항목 모두 제거
      return todos.filter((todo) => !todo.checked);
    case 'TOGGLE_ALL': // 모든 항목 체크 상태 반전
      return todos.map((todo) => ({
        ...todo,
        checked: action.checked,
      }));
    case 'RESTORE': // 삭제된 항목 복원
      return todos.concat(
        action.todos.filter((todo) => !todos.some((t) => t.id === todo.id)),
      ); // 중복 체크 후 복원
    default:
      return todos;
  }
}

function App() {
  // useReducer로 상태 관리
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  // 삭제된 항목들을 저장하는 상태 추가
  const [deletedTodos, setDeletedTodos] = useState([]);

  // 고유 id로 사용될 값
  const nextId = useRef(5001);

  // 검색어 상태
  const [searchText, setSearchText] = useState('');
  const [deletedCount, setDeletedCount] = useState(0); // 삭제된 항목 수를 저장할 상태 추가

  // 항목 추가 핸들러
  const onInsert = useCallback((text) => {
    // 사용자가 입력한 일정, 객체
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    // 불변성 유지 하면서, 내장함수 concat , 기본 배열에 추가하기.
    dispatch({ type: 'INSERT', todo });
    nextId.current += 1; // nextId를 1씩 증가

    // 항목 추가 알림
    alert(`${todo.text}가 추가되었습니다.`); // 추가된 항목의 이름을 포함한 알림
  }, []);

  // 항목 제거 핸들러
  const onRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE', id });
  }, []);

  // 체크 상태 토글 핸들러
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
  }, []);

  // 체크된 항목 모두 삭제 핸들러
  // 실습 1: 체크된 항목 모두 삭제 기능 구현
  const onClearChecked = useCallback(() => {
    const checkedTodos = todos.filter((todo) => todo.checked);
    const checkedCount = checkedTodos.length; // 삭제될 체크된 항목 수

    // 삭제 확인 팝업
    if (checkedCount === 0) {
      alert('삭제할 체크된 항목이 없습니다.'); // 체크된 항목이 없는 경우 알림
      return;
    }

    // 삭제 확인
    const confirmDelete = window.confirm(
      `${checkedCount}개의 체크된 항목을 삭제하시겠습니까?`,
    );
    if (confirmDelete) {
      dispatch({ type: 'REMOVE_CHECKED' });
      setDeletedCount(checkedCount); // 삭제된 항목 수 업데이트
      setDeletedTodos(checkedTodos); // 삭제된 항목 저장
      alert(`${checkedCount}개의 체크된 항목이 삭제되었습니다.`); // 삭제된 항목 수를 포함한 알림
    }
  }, [todos]);

  // 삭제된 항목 복원 핸들러
  const onRestoreDeleted = useCallback(() => {
    if (deletedTodos.length === 0) {
      alert('복원할 삭제된 항목이 없습니다.'); // 복원할 항목이 없는 경우 알림
      return;
    }

    dispatch({ type: 'RESTORE', todos: deletedTodos }); // 삭제된 항목 복원
    setDeletedCount(0); // 삭제된 항목 수 초기화
    setDeletedTodos([]); // 삭제된 항목 초기화
    alert(`${deletedTodos.length}개의 항목이 복원되었습니다.`); // 복원된 항목 수 알림
  }, [deletedTodos]);

  // 모든 항목 체크 상태 반전 핸들러
  const toggleAll = useCallback(() => {
    const allChecked = todos.every((todo) => todo.checked);
    dispatch({ type: 'TOGGLE_ALL', checked: !allChecked });
  }, [todos]);

  // 검색 상태 업데이트 핸들러
  // 실습 2: 할 일 검색 기능 구현
  const onChangeSearch = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  // 검색된 항목 필터링
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <h1 className="react">ch11 컴포넌트 성능 최적화</h1>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <div>
          <input
            type="text"
            placeholder="할 일을 검색하세요"
            value={searchText}
            onChange={onChangeSearch}
          />
          <button
            onClick={onClearChecked}
            disabled={todos.every((todo) => !todo.checked)}
          >
            체크된 항목 모두 삭제
          </button>
          <button onClick={toggleAll}>상태 체크 반전 모두하기</button>
          <button
            onClick={onRestoreDeleted}
            disabled={deletedTodos.length === 0}
          >
            삭제된 항목 복원
          </button>
        </div>
        {/* 삭제된 항목 수 표시 */}
        {deletedCount > 0 && <p>{deletedCount}개의 항목이 삭제되었습니다.</p>}
        <TodoList
          todos={filteredTodos}
          onRemove={onRemove}
          onToggle={onToggle}
        />
        {/* 검색 결과가 없을 때 메시지 표시 */}
        {filteredTodos.length === 0 && searchText && (
          <p>검색 결과가 없습니다.</p>
        )}
      </TodoTemplate>
    </>
  );
}

export default App;
