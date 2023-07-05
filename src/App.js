import './App.css';
import BarChart from './components/BarChart';
import { DATA } from './data/Data'

function App() {
  return (
    <div>
      <BarChart data={DATA} />
    </div>
  );
}

export default App;
