import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../../pages/Main/Main';
import CharacterDetails from '../../pages/CharacterDetails/CharacterDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="details/:id" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
