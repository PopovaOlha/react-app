import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import CharacterDetails from '../../pages/CharacterDetails/CharacterDetails';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/search" element={<Main />} />
          <Route path="details:id" element={<CharacterDetails />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
