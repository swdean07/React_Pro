import TodoListItem from './TodoListItem';
import './TodoList.scss';
//가상화 최적화 준비1
import { List } from 'react-virtualized';
import { useCallback } from 'react'

// 추가 1-1 , onRemove
// 추가 2-1 , onToggle
const TodoList = ({ todos, onRemove, onToggle }) => {
    //가상화 최적화 준비2
    const rowRenderer = useCallback(
        ({ index, key, style }) => {
            const todo = todos[index];
            return (
                <TodoListItem
                    todo={todo}
                    key={key}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    style={style}
                />
            );
        },
        [onRemove, onToggle, todos]
    );
    return (
        <List
            className="TodoList"
            width={512} // 전체 너비
            height={513} // 전체 높이
            rowCount={todos.length} // 항목 개수
            rowHeight={57} // 각 항목의 높이
            rowRenderer={rowRenderer} // 항목을 렌더링하는 함수
            list={todos} // 렌더링할 데이터 배열
            style={{ outline: 'none' }} // 기본 outline 스타일 제거
        />
    );
};

export default TodoList;