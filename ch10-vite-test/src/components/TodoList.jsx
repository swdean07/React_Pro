import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="TodoList">
            {todos.map((todo) => (
                <div key={todo.id} className="TodoList-item-wrapper">
                    <TodoListItem
                        todo={todo}
                        onRemove={onRemove}
                        onToggle={onToggle}
                    />
                </div>
            ))}
        </div>
    );
};

export default TodoList;
