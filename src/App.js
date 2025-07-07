import './App.css';
import Logger from './utils/logger.ts';

function App() {
  // Example log usage
  Logger.info('App component rendered', { component: 'App' });

  return (
    <div className="App">
      Hello
    </div>
  );
}

export default App;