//추가2-1, useRef, useCallback
import { useRef, useCallback, useState, useReducer } from 'react'
import './App.css'
import TodoTemplate from './components/TodoTemplate'
import TodoInsert from './components/TodoInsert'
import TodoList from './components/TodoList'

// 더미 데이터 추가1
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

// 리듀서 함수 이용하기.
// todoReducer 함수
function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT': // 새 항목 추가
      // { type: 'INSERT', todo: { id: 1, text: 'todo', checked: false } }
      return todos.concat(action.todo);

    case 'REMOVE': // 항목 제거
      // { type: 'REMOVE', id: 1 }
      return todos.filter((todo) => todo.id !== action.id);

    case 'TOGGLE': // 체크 상태 토글
      // { type: 'TOGGLE', id: 1 }
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo
      );

    case 'REMOVE_CHECKED': // 체크된 항목 모두 제거
      return todos.filter((todo) => !todo.checked);

    case 'TOGGLE_ALL': // 모든 항목 체크 상태 반전
      return todos.map((todo) => ({
        ...todo,
        checked: action.checked,
      }));

    default:
      return todos;
  }
}


function App() {

  // createBulkTodos, 한번만 호출하기 위해서, 
  // () 빼고 넣기.
  // const [todos, setTodos] = useState(createBulkTodos);

  // useReducer로 상태 관리
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);

  //추가2-2, useRef
  // 고유 id로 사용될 값
  // ref를 사용하여 변수 담기
  const nextId = useRef(5001);

  const [searchText, setSearchText] = useState('')

  //추가2-3, useCallback 이용해서, 한번만 생성후, 재사용.
  const onInsert = useCallback(
    (text) => {
      // 사용자가 입력한 일정, 객체
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // 불변성 유지 하면서, 내장함수 concat , 기본 배열에 추가하기.
      // setTodos((todos) => todos.concat(todo)); // 새로운 항목 추가
      dispatch({ type: 'INSERT', todo });
      nextId.current += 1; // nextId를 1씩 증가
    },
    []
  );

  // 추가 3-1,
  const onRemove = useCallback(
    (id) => {
      // setTodos(
      //   (todos) => todos.filter((todo) => todo.id !== id)
      // );
      dispatch({ type: 'REMOVE', id });

    },
    []
  );

  // 추가 4-1
  const onToggle = useCallback((id) => {
    dispatch({ type: 'TOGGLE', id });
    // setTodos(
    //   (todos) =>
    //     todos.map((todo) =>
    //       todo.id === id ? { ...todo, checked: !todo.checked } : todo
    //     )
    // );
  }, []);

  // 체크된 항목 모두 삭제
  const onClearChecked = useCallback(() => {
    const checkedCount = todos.filter((todo) => todo.checked).length;
    dispatch({ type: 'REMOVE_CHECKED' });
    alert(`${checkedCount}개의 항목이 삭제되었습니다.`);
  }, [todos]);

  // 모든 항목 체크 상태 반전
  const toggleAll = useCallback(() => {
    const allChecked = todos.every((todo) => todo.checked);
    dispatch({ type: 'TOGGLE_ALL', checked: !allChecked });
  }, [todos]);

  // 검색 상태 업데이트
  const onChangeSearch = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  // 검색된 항목 필터링
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <h1 className='react'>ch11 컴포넌트 성능 최적화</h1>
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <div>
          <input
            type="text"
            placeholder="할 일을 검색하세요"
            value={searchText}
            onChange={onChangeSearch}
          />
          <button onClick={onClearChecked} disabled={todos.every((todo) =>
            !todo.checked)}>체크된 항목 모두 삭제</button>
          <button onClick={toggleAll}>상태 체크 반전 모두하기</button>
        </div>
        <TodoList todos={filteredTodos} onRemove={onRemove} onToggle={onToggle} />
      </TodoTemplate>
    </>
  );
}

export default App;