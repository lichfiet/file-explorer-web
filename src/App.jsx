import './App.css';
import { NavBar} from './components/navBar.jsx'
import HomePage from './pages/home.jsx';
import Projects from './pages/home.jsx';
import '@picocss/pico'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
          <Route index element={<Projects />} />
          <Route path="home" element={<HomePage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
