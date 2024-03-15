const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Sample data for storing to-do items
let todos = [
  { id: 1, task: 'Buy groceries', completed: false },
  { id: 2, task: 'Walk the dog', completed: true }
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// GET /todos - Get all to-do items
app.get('/todos', (req, res) => {
  res.json(todos);
});

// POST /todos - Create a new to-do item
app.post('/todos', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const newTodo = {
    id: todos.length + 1,
    task,
    completed: false
  };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

// PUT /todos/:id - Update a to-do item's completion status
app.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const todoToUpdate = todos.find(todo => todo.id === parseInt(id));
  if (!todoToUpdate) {
    return res.status(404).json({ error: 'To-do item not found' });
  }

  todoToUpdate.completed = completed;
  res.json(todoToUpdate);
});

// DELETE /todos/:id - Delete a to-do item
app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter(todo => todo.id !== parseInt(id));
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
