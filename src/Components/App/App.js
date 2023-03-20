import './App.css';
import Instructions from '../Instructions/Instructions';
import DatesEntry from '../DatesEntry/DatesEntry';
import GoToTop from '../GoToTop/GoToTop';

function App() {
  return (
    <div className="App-container">
      <Instructions />
      <DatesEntry />
      <GoToTop />
    </div>
  );
}

export default App;
