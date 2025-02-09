import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import CharacterDetails from '../../pages/CharacterDetails/CharacterDetails';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import NotFound from '../NotFound/NotFound';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route
              path="details"
              element={<CharacterDetails searchTerm="" page={1} />}
            />
          </Route>
          <Route path="/search" element={<Main />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
