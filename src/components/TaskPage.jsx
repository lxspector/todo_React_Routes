import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodos } from '../hooks/useTodos';

function TaskPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, updateTodo, deleteTodo } = useTodos();
  const [taskDetails, setTaskDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  useEffect(() => {
    if (todos.length > 0) {
      const taskId = parseInt(id, 10);
      const task = todos.find((t) => t.id === taskId);

      if (task) {
        setTaskDetails(task);
        setEditedTitle(task.title);
      } else {
        navigate('/404');
      }
    }
  }, [id, todos, navigate]);

  const handleUpdate = () => {
    updateTodo(id, editedTitle).then(() => {
      setEditMode(false);
      setTaskDetails({ ...taskDetails, title: editedTitle });
    });
  };

  const handleDelete = () => {
    deleteTodo(id).then(() => {
      navigate('/');
    });
  };

  return (
    <div>
      <button onClick={() => navigate(-1)} className="back-button">
        Назад
      </button>
      {taskDetails ? (
        <div className="task-details">
          {editMode ? (
            <div className="edit-mode">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-input"
              />
              <button onClick={handleUpdate} className="action-button">
                Сохранить
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="cancel-button"
              >
                Отмена
              </button>
            </div>
          ) : (
            <div className="view-mode">
              <h2>{taskDetails.title}</h2>
              <button onClick={() => setEditMode(true)} className="edit-button">
                Редактировать
              </button>
              <button onClick={handleDelete} className="delete-button">
                Удалить
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
}

export default TaskPage;
