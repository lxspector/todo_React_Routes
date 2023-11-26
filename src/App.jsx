import { useState } from 'react';
import { useTodos } from './hooks/useTodos';

const App = () => {
  const {
    newTodo,
    setNewTodo,
    searchTerm,
    setSearchTerm,
    sorted,
    setSorted,
    displayedTodos,
    addTodo,
    deleteTodo,
    updateTodo,
  } = useTodos();

  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState('');

  return (
    <div className="app">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo"
      />
      <button onClick={addTodo}>Add</button>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search todos"
      />
      <button onClick={() => setSorted(!sorted)}>Sort Alphabetically</button>
      <ul>
        {displayedTodos.map((todo) => (
          <li key={todo.id}>
            {editing === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button
                  onClick={() => {
                    updateTodo(todo.id, editingText);
                    setEditing(null);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{todo.title} </span>
                <button
                  onClick={() => {
                    setEditing(todo.id);
                    setEditingText(todo.title);
                  }}
                >
                  Edit
                </button>
              </>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
