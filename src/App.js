import { useSelector } from 'react-redux';
import './App.css';
import Home from './pages/Home';
import { selectReadLimit } from './store/features/read-limit/readLimitSlice';

function App() {
  const readLimit = useSelector(selectReadLimit);
  console.log(readLimit, 'rc')
  return (
    <Home />
  );
}

export default App;
