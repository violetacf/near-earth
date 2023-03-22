import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Instructions from '../Instructions/Instructions';
import DatesEntry from '../DatesEntry/DatesEntry';
import GoToTop from '../GoToTop/GoToTop';
import CloseUpElement from '../CloseUpElement/CloseUpElement';
import CreatedBy from '../CreatedBy/CreatedBy';

function App() {
  return (
    <div className="App-container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Instructions /> <DatesEntry />
              </div>
            }
          />
          <Route path="/learn-more-element/:id" element={<CloseUpElement />} />
        </Routes>
        <GoToTop />
        <CreatedBy />
      </BrowserRouter>
    </div>
  );
}

export default App;
