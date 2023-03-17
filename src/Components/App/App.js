import './App.css';
import Instructions from '../Instructions/Instructions';
import DatesEntry from '../DatesEntry/DatesEntry';
// import DateRangeComp from '../DatesEntry/DatesRange';

function App() {
  return (
    <div className="App">
      <Instructions />
      <DatesEntry />
      {/* <DateRangeComp /> */}
    </div>
  );
}

export default App;
