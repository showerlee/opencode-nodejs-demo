import { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import ServerStatus from './components/ServerStatus';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todos');
      if (!response.ok) throw new Error('Failed to fetch todos');
      const data = await response.json();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (text) => {
    try {
      const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!response.ok) throw new Error('Failed to add todo');
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todo = todos.find(t => t.id === id);
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed })
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      setTodos(todos.map(t => t.id === id ? updatedTodo : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>React + Node.js Demo</h1>
        <p>A full-stack todo application</p>
      </header>

      <main className="main">
        <div className="dashboard">
          <div className="server-section">
            <ServerStatus />
          </div>
          
          <div className="todos-section">
            <AddTodo onAdd={addTodo} />
            
            {error && (
              <div className="error">
                Error: {error}
                <button onClick={fetchTodos}>Retry</button>
              </div>
            )}
            
            {loading ? (
              <div className="loading">Loading todos...</div>
            ) : (
              <TodoList 
                todos={todos} 
                onToggle={toggleTodo} 
                onDelete={deleteTodo} 
              />
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Built with React, Node.js, Express, and Vite</p>
      </footer>
    </div>
  );
}

export default App;