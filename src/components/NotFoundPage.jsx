import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h1>404 - Страница не найдена</h1>
      <p>
        Извините, страница, которую вы ищете, не существует или была удалена.
      </p>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  );
}

export default NotFoundPage;
