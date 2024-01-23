import './App.css';
import FileExplorer from './components/fileExplorer/fileExplorer'
import { NavBar } from './components/navBar';
import '@picocss/pico'

function App() {

  return (
    <div className="container-fluid">
      <header>
        <NavBar />
      </header>
      <div className="container">
            <FileExplorer />
      </div>
    </div>
  );
}

export default App;
