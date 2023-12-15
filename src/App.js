import './App.css';
import FileUploadForm from './components/fileUploadForm';
import FileDisplayForm from './components/fileDisplayForm';
import FileListBlock from './components/fileListBlock';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <FileUploadForm />
        <FileDisplayForm />
        <FileListBlock />
      </header>
    </div>
  );
}

export default App;
