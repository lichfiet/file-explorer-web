import './App.css';
import FileUploadForm from './components/fileUploadForm';
import FileDisplayForm from './components/fileDisplayForm';
import FileListBlock from './components/fileListBlock';
import { NavBar } from './components/navBar';
import '@picocss/pico'

function App() {

  return (
    <div className="container-fluid">
      <header>
        <NavBar />
      </header>
      <body>
        <div class="container">
          <article>
            <section>
              <FileUploadForm />
            </section>
            <FileDisplayForm />
            <FileListBlock />


          </article>
        </div>
      </body>
    </div>
  );
}

export default App;
