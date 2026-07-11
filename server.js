const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, text: 'Learn React', completed: true },
  { id: 2, text: 'Build Node.js API', completed: false },
  { id: 3, text: 'Connect frontend to backend', completed: false }
];

app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    text: req.body.text,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
  todo.text = req.body.text || todo.text;
  
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});