import TodoItem from './TodoItem';

function TodoList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <p>No todos yet. Add one above!</p>
      </div>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="todo-list">
      <div className="stats">
        <span>Total: {todos.length}</span>
        <span>Completed: {completedCount}</span>
        <span>Pending: {todos.length - completedCount}</span>
      </div>
      
      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;