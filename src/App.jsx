import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './components/HomePage'; // Путь к вашему компоненту HomePage
import TaskPage from './components/TaskPage'; // Путь к вашему компоненту TaskPage
import NotFoundPage from './components/NotFoundPage'; // Путь к вашему компоненту NotFoundPage
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/task/:id" element={<TaskPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
