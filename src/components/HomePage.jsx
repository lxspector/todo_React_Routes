import { useTodos } from '../hooks/useTodos';
import { Link } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';

function HomePage() {
  const {
    displayedTodos,
    newTodo,
    setNewTodo,
    searchTerm,
    setSearchTerm,
    addTodo,
    sorted,
    setSorted,
  } = useTodos();
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // debouncedSearchTerm для фильтрации задач
  const filteredTodos = displayedTodos.filter((todo) =>
    todo.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  // Обрезка строки на 40 символах
  const truncateTitle = (title) => {
    const maxLen = 40;
    return title.length > maxLen ? title.substring(0, maxLen) + '...' : title;
  };

  return (
    <div>
      <h1>Список Дел</h1>

      <div className="input-group">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новую задачу"
          className="text-input"
        />
        <button
          onClick={addTodo}
          disabled={!newTodo.trim()}
          className="action-button"
        >
          Добавить
        </button>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Поиск..."
          className="text-input"
        />
        <button onClick={() => setSorted(!sorted)} className="action-button">
          {sorted ? 'Стандартная сортировка' : 'Сортировка по алфавиту'}
        </button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/task/${todo.id}`} className="task-text">
              {truncateTitle(todo.title)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
