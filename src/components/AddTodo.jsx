import { useState } from 'react';

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setSubmitting(true);
    try {
      await onAdd(text);
      setText('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input"
        disabled={submitting}
      />
      <button 
        type="submit" 
        className="add-btn"
        disabled={!text.trim() || submitting}
      >
        {submitting ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}

export default AddTodo;