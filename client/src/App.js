import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Views/Dashboard';
import Upload from './Views/ImageUpload';
import TopBar from './Views/Global/TopBar';
import Footer from './Views/Global/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
