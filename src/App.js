import './App.css';
import FileUploadForm from './components/fileUploadForm';
import FileDisplayForm from './components/fileDisplayForm';
import FileListBlock from './components/fileListBlock';
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
        <article>
          <section>
            <div className="grid" >
              <div className="container" style={{padding: "30px"}}>
                <FileUploadForm />
              </div>
              {
              <div className="container" style={{padding: "20px"}}>
                {
                //  <FileDisplayForm />
                }
              </div>
              }
            </div>
          </section>

          <section>
            <FileExplorer />
          </section>
        </article>
      </div>
    </div>
  );
}

export default App;
